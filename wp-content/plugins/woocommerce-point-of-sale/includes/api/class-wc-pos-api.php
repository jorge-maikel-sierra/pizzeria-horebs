<?php
/**
 * Class WC_POS_API file.
 *
 * This class is only loaded when the request is coming from the POS. Therefore, there is no need to
 * to perform wc_pos_is_register_page() or wc_pos_is_pos_referer() checks.
 *
 * @see WC_POS_App::wc_api_init().
 * @package WooCommerce_Point_Of_Sale/Classes/API
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Utilities\ArrayUtil;

require_once WC_ABSPATH . 'includes/wc-cart-functions.php';

/**
 * WC_POS_APIo
 */
class WC_POS_API {
	public function __construct() {
		$this->init_hooks();
	}

	public function init_hooks() {
		/* New hooks.*/
		add_action( 'woocommerce_rest_insert_shop_order_object', [ $this, 'update_inserted_order_object' ], 10, 3 );

		/* Old hooks */
		// @todo refactor/deprecate
		add_filter( 'woocommerce_rest_customer_query', [ $this, 'filter_user_api_query_args' ], 99, 2 );
		add_action( 'users_pre_query', [ $this, 'filter_users_where_query' ], 10, 2 );
		add_action( 'pre_get_users', [ $this, 'pre_get_users' ], 99, 1 );

		// Override WC tax settings.
		add_filter( 'woocommerce_order_get_tax_location', [ $this, 'order_get_tax_location' ], 9999, 2 );
		add_filter( 'wc_tax_enabled', [ $this, 'tax_enabled' ], 9999, 1 );

		add_filter( 'woocommerce_order_needs_payment', [ $this, 'order_needs_payment' ], 999, 3 );
	}

	/**
	 * Updates and modifies the order object upon insertion in the database.
	 *
	 * @param WC_Order        $data_object Inserted object.
	 * @param WP_Rest_request $request      Request object.
	 * @param boolean         $creating     True when creating object, false when updating.
	 *
	 * @return void
	 */
	public function update_inserted_order_object( $order, $request, $creating ) {
		if ( isset( $request['order_note'] ) && $request['order_note'] ) {
			$added_by   = isset( $request['wc_pos_served_by'] ) ? $request['wc_pos_served_by'] : false;
			$comment_id = $order->add_order_note( $request['order_note'], 0, $added_by );

			$order->add_meta_data( '_wc_pos_order_note_id', $comment_id, true );
		}

		if ( isset( $request['created_via'] ) && 'pos' === $request['created_via'] ) {
			$order->set_created_via( 'pos' );
		}

		$order->save();

		$hold     = isset( $request['hold'] ) && $request['hold'];
		$set_paid = isset( $request['set_paid'] ) && $request['set_paid'];

		if ( $creating ) {
			if ( $hold ) {
				/**
				 * Fires after a new order is put on hold via POS.
				 *
				 * @since 6.0.1
				 *
				 * @param $order_id Order ID.
				 */
				do_action( 'wc_pos_order_held', $order->get_id() );
			} else {
				/**
				 * Fires after a new order is created via POS.
				 *
				 * @since 6.0.0
				 *
				 * @param $order_id Order ID.
				 */
				do_action( 'wc_pos_order_created', $order->get_id() );
			}
		} else {
			/**
			 * Fires after an order is updated via POS.
			 *
			 * @since 6.0.0
			 *
			 * @param $order_id Order ID.
			 */
			do_action( 'wc_pos_order_updated', $order->get_id() );
		}

		if ( $set_paid ) {
			/**
			 * Fires upon an order is paid via POS.
			 *
			 * @since 6.0.0
			 *
			 * @param $order_id Order ID.
			 */
			do_action( 'wc_pos_order_paid', $order->get_id() );
		}
	}

	public function order_get_tax_location( $args, $order ) {
		$tax_based_on = get_option( 'wc_pos_calculate_tax_based_on', 'outlet' );

		if ( 'default' === $tax_based_on ) {
			$tax_based_on = get_option( 'woocommerce_tax_based_on' );
		}

		/**
		 * This filter is documented in WC core.
		 *
		 * @since 6.4.0
		 */
		$apply_base_tax_for_local_pickup = true === apply_filters( 'woocommerce_apply_base_tax_for_local_pickup', true );

		/**
		 * This fitler is documented in WC core.
		 *
		 * @since 6.4.0
		 */
		$local_pickup_methods   = apply_filters( 'woocommerce_local_pickup_methods', [ 'legacy_local_pickup', 'local_pickup' ] );
		$order_shipping_methods = $order->get_shipping_methods();
		$shipping_method_ids    = ArrayUtil::select( $order_shipping_methods, 'get_method_id', ArrayUtil::SELECT_BY_OBJECT_METHOD );

		if ( $apply_base_tax_for_local_pickup && count( array_intersect( $shipping_method_ids, $local_pickup_methods ) ) > 0 ) {
			$tax_based_on = 'base';
		}

		if ( 'shipping' === $tax_based_on && ! $order->get_shipping_country() ) {
			$tax_based_on = 'billing';
		}

		$base_location = wc_pos_get_shop_location();

		$headers     = array_change_key_case( wc_pos_getallheaders(), CASE_UPPER );
		$register_id = ! empty( $headers['X-POS-ID'] ) ? intval( $headers['X-POS-ID'] ) : 0;
		$outlet      = wc_pos_get_outlet_location( $register_id );

		$outlet_location = [
			'country'  => isset( $outlet['country'] ) ? $outlet['country'] : '',
			'state'    => isset( $outlet['state'] ) ? $outlet['state'] : '',
			'postcode' => isset( $outlet['postcode'] ) ? $outlet['postcode'] : '',
			'city'     => isset( $outlet['city'] ) ? $outlet['city'] : '',
		];

		$customer_billing_location = [
			'country'  => $order->get_billing_country(),
			'state'    => $order->get_billing_state(),
			'postcode' => $order->get_billing_postcode(),
			'city'     => $order->get_billing_city(),
		];

		$customer_shipping_location = [
			'country'  => $order->get_shipping_country(),
			'state'    => $order->get_shipping_state(),
			'postcode' => $order->get_shipping_postcode(),
			'city'     => $order->get_shipping_city(),
		];

		if ( 'outlet' === $tax_based_on ) {
			$args = $outlet_location;
		} elseif ( 'billing' === $tax_based_on ) {
			$args = $customer_billing_location;
		} elseif ( 'shipping' === $tax_based_on ) {
			$args = $customer_shipping_location;
		} elseif (
			wc_prices_include_tax() ||
			'base' === get_option( 'woocommerce_default_customer_address' ) ||
			'base' === $tax_based_on
		) {
			$args = $base_location;
		}

		// Default to outlet address if no location is set.
		if ( empty( $args['country'] ) ) {
			$args = $outlet_location;
		}

		return $args;
	}

	/**
	 * Override wc_tax_enabled() when used by POS.
	 *
	 * @param bool $tax_enabled
	 * @return bool
	 */
	public function tax_enabled( $tax_enabled ) {
		if ( wc_pos_is_register_page() || wc_pos_is_pos_referer() ) {
			return $tax_enabled && 'enabled' === get_option( 'wc_pos_tax_calculation', 'enabled' );
		}

		return $tax_enabled;
	}

	/**
	 * Allows orders with zero in total to get paid.
	 *
	 * @param WC_Order $order
	 * @param array    $valid_order_statuses
	 *
	 * @return bool
	 */
	public function order_needs_payment( $needs_payment, $order, $valid_order_statuses ) {
		return $order->has_status( $valid_order_statuses );
	}

	public function pre_get_users( $query ) {
		if ( isset( $query->query_vars['role'] ) && 'all' === $query->query_vars['role'] ) {
			$query->query_vars['role'] = '';
		}

		return $query;
	}

	/**
	 * Filter query args.
	 *
	 * @param array           $args
	 * @param WP_REST_Request $request
	 *
	 * @return array
	 */
	public function filter_user_api_query_args( $args, $request ) {
		$referer = $request->get_header( 'referer' );
		if ( strpos( $referer, 'point-of-sale' ) === false ) {
			return $args;
		}

		$meta_query = isset( $args['meta_query'] ) ? (array) $args['meta_query'] : [];
		if ( array_key_exists( 'search', $request->get_params() ) ) {
			array_push(
				$meta_query,
				[
					'relation' => 'OR',
					[
						'key'     => 'first_name',
						'value'   => isset( $_REQUEST['search'] ) ? explode( ' ', trim( sanitize_text_field( $_REQUEST['search'] ) ) ) : '',
						'compare' => 'IN',
					],
					[
						'key'     => 'last_name',
						'value'   => isset( $_REQUEST['search'] ) ? explode( ' ', trim( sanitize_text_field( $_REQUEST['search'] ) ) ) : '',
						'compare' => 'IN',
					],
					[
						'key'     => 'billing_phone',
						'value'   => isset( $_REQUEST['search'] ) ? sanitize_text_field( $_REQUEST['search'] ) : '',
						'compare' => 'LIKE',
					],
					[
						'key'     => 'billing_company',
						'value'   => isset( $_REQUEST['search'] ) ? sanitize_text_field( $_REQUEST['search'] ) : '',
						'compare' => 'LIKE',
					],
					[
						'key'   => 'wc_pos_user_card_number',
						'value' => isset( $_REQUEST['search'] ) ? sanitize_text_field( $_REQUEST['search'] ) : '',
					],
				]
			);

			$args['search_columns'] = [ 'user_login', 'user_nicename', 'user_email' ];
		}

		if ( array_key_exists( 'outlet_id', $request->get_params() ) ) {
			array_push(
				$meta_query,
				[
					[
						'key'     => 'wc_pos_assigned_outlets',
						'value'   => sprintf( 's:%s:"%s";', strlen( $request->get_param( 'outlet_id' ) ), $request->get_param( 'outlet_id' ) ),
						'compare' => 'LIKE',
					],
				]
			);

			// when search has any value it tries to add search_columns arg automatically. so we mute it.
			$args['search'] = '';
		}

		$args['meta_query'] = $meta_query;

		return $args;
	}

	/**
	 * Filter users where query.
	 *
	 * @param $results
	 * @param $wp_query WP_User_Query
	 *
	 * @return array|null
	 */
	public function filter_users_where_query( $results, $wp_query ) {
		$referer = isset( $_SERVER['HTTP_REFERER'] ) ? filter_var( $_SERVER['HTTP_REFERER'], FILTER_VALIDATE_URL ) : '';
		if ( strpos( $referer, 'point-of-sale' ) !== false && ! empty( $_GET['search'] ) ) {
			$wp_query->query_where = str_replace( ') AND (', ') OR (', $wp_query->query_where );
		}

		return $results;
	}

	/**
	 * Helper functions for the API endpoints.
	 */

	/**
	 * Returns the current register ID from request headers.
	 *
	 * @return int Register ID.
	 */
	public static function get_headers_data() {
		$register_id = 0;
		$outlet_id   = 0;

		$headers = array_change_key_case( wc_pos_getallheaders(), CASE_UPPER );

		if ( ! empty( $headers['X-POS-ID'] ) ) {
			$register_id = intval( $headers['X-POS-ID'] );
		}

		$register = wc_pos_get_register( $register_id );
		if ( $register && is_a( $register, 'WC_POS_Register' ) ) {
			$outlet_id = $register->get_outlet();
		}

		return [
			'register_id' => $register_id,
			'outlet_id'   => $outlet_id,
		];
	}
}
