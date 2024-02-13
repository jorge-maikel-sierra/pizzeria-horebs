<?php
/**
 * Load Admin Assets
 *
 * @package WooCommerce_Point_Of_Sale/Classes/Admin
 */

defined( 'ABSPATH' ) || exit;

if ( class_exists( 'WC_POS_Admin_Assets', false ) ) {
	return new WC_POS_Admin_Assets();
}

/**
 * WC_POS_Admin_Assets.
 *
 * Handles assets loading in admin.
 */
class WC_POS_Admin_Assets {

	private $screen_id        = '';
	private $wc_screen_id     = '';
	private $wc_pos_screen_id = '';

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Lower priorty to allow WC assets to be registered.
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_styles' ], 99 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ], 99 );

		$this->connect_pages();
	}

	private function init_props() {
		$screen                 = get_current_screen();
		$this->screen_id        = $screen ? $screen->id : '';
		$this->wc_screen_id     = WC_POS()->wc_screen_id();
		$this->wc_pos_screen_id = WC_POS()->plugin_screen_id();
	}

	/**
	 * Connect plugin pages to WooCommerce dashboard.
	 */
	public function connect_pages() {
		if ( ! function_exists( 'wc_admin_connect_page' ) ) {
			return;
		}

		// Point of Sale > Registers.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-registers',
				'screen_id' => 'edit-pos_register',
				'title'     => __( 'Registers', 'woocommerce-point-of-sale' ),
				'path'      => add_query_arg( 'post_type', 'pos_register', 'edit.php' ),
			]
		);

		// Point of Sale > Registers > Add New.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-add-register',
				'parent'    => 'woocommerce-point-of-sale-registers',
				'screen_id' => 'pos_register-add',
				'title'     => __( 'Add New', 'woocommerce-point-of-sale' ),
			]
		);

		// Point of Sale > Register > Edit Register.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-edit-register',
				'parent'    => 'woocommerce-point-of-sale-registers',
				'screen_id' => 'pos_register',
				'title'     => __( 'Edit Register', 'woocommerce-point-of-sale' ),
			]
		);

		// Point of Sale > Outlets.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-outlets',
				'screen_id' => 'edit-pos_outlet',
				'title'     => __( 'Outlets', 'woocommerce-point-of-sale' ),
				'path'      => add_query_arg( 'post_type', 'pos_outlet', 'edit.php' ),
			]
		);

		// Point of Sale > Outlets > Add New.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-add-outlet',
				'parent'    => 'woocommerce-point-of-sale-outlets',
				'screen_id' => 'pos_outlet-add',
				'title'     => __( 'Add New', 'woocommerce-point-of-sale' ),
			]
		);

		// Point of Sale > Outlets > Edit Outlet.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-edit-outlet',
				'parent'    => 'woocommerce-point-of-sale-outlets',
				'screen_id' => 'pos_outlet',
				'title'     => __( 'Edit Outlet', 'woocommerce-point-of-sale' ),
			]
		);

		// Point of Sale > Grids.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-grids',
				'screen_id' => 'edit-pos_grid',
				'title'     => __( 'grids', 'woocommerce-point-of-sale' ),
				'path'      => add_query_arg( 'post_type', 'pos_grid', 'edit.php' ),
			]
		);

		// Point of Sale > Grids > Add New.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-add-grid',
				'parent'    => 'woocommerce-point-of-sale-grids',
				'screen_id' => 'pos_grid-add',
				'title'     => __( 'Add New', 'woocommerce-point-of-sale' ),
			]
		);

		// Point of Sale > Grids > Edit Grid.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-edit-grid',
				'parent'    => 'woocommerce-point-of-sale-grids',
				'screen_id' => 'pos_grid',
				'title'     => __( 'Edit Grid', 'woocommerce-point-of-sale' ),
			]
		);

		// Point of Sale > Receipts.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-receipts',
				'screen_id' => 'edit-pos_receipt',
				'title'     => __( 'Receipts', 'woocommerce-point-of-sale' ),
				'path'      => add_query_arg( 'post_type', 'pos_receipt', 'edit.php' ),
			]
		);

		// Point of Sale > Barcodes.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-barcodes',
				'screen_id' => $this->wc_pos_screen_id . '_page_wc-pos-barcodes',
				'title'     => __( 'Barcodes', 'woocommerce-point-of-sale' ),
				'path'      => add_query_arg( 'page', 'wc-pos-barcodes', 'admin.php' ),
			]
		);

		// Point of Sale > Stock.
		wc_admin_connect_page(
			[
				'id'        => 'woocommerce-point-of-sale-stock',
				'screen_id' => $this->wc_pos_screen_id . '_page_wc-pos-stock-controller',
				'title'     => __( 'Stock', 'woocommerce-point-of-sale' ),
				'path'      => add_query_arg( 'page', 'wc-pos-stock-controller', 'admin.php' ),
			]
		);
	}

	/**
	 * Enqueue admin styles.
	 */
	public function admin_styles() {
		$this->init_props();

		// Register admin styles.
		wp_register_style( 'wc-pos-fonts', WC_POS()->plugin_url() . '/assets/dist/css/fonts.min.css', [], WC_POS_VERSION );
		wp_register_style( 'wc-pos-admin-meta-boxes', WC_POS()->plugin_url() . '/assets/dist/css/admin/meta-boxes.min.css', [], WC_POS_VERSION );
		wp_register_style( 'wc-pos-barcode-options', WC_POS()->plugin_url() . '/assets/dist/css/admin/barcode-options.min.css', [], WC_POS_VERSION );
		wp_register_style( 'wc-pos-admin', WC_POS()->plugin_url() . '/assets/dist/css/admin/admin.min.css', [], WC_POS_VERSION );

		// Load fonts.css globally.
		wp_enqueue_style( 'wc-pos-fonts' );

		// Admin pages that are created/modified by the plugin.
		if ( in_array( $this->screen_id, wc_pos_get_screen_ids(), true ) ) {
			wp_enqueue_style( 'wc-components' ); // Loads necessary styles for select2.
			wp_enqueue_style( 'thickbox' );
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_style( 'woocommerce_admin_styles' );
			wp_enqueue_style( 'jquery-ui-style' );
			wp_enqueue_style( 'woocommerce-layout' ); // @todo This should not be used in admin. Make sure it's unneeded then remove it.
			wp_enqueue_style( 'wc-pos-admin' );
		}

		// Barcode page.
		if ( $this->wc_pos_screen_id . '_page_wc-pos-barcodes' === $this->screen_id ) {
			wp_enqueue_style( 'wc-pos-barcode-options' );
		}

		// Add/edit receipt.
		if ( 'pos_receipt' === $this->screen_id ) {
			wp_enqueue_style( 'customize-controls' );
		}

		// Our custom post type pages.
		if ( in_array( $this->screen_id, [ 'pos_register', 'pos_outlet', 'pos_grid', 'product' ], true ) ) {
			wp_enqueue_style( 'wc-pos-admin-meta-boxes' );
		}

		// Orders page.
		if ( $this->is_orders_page() ) {
			wp_enqueue_style( 'wc-pos-admin' );
		}
	}

	/**
	 * Enqueue admin scripts.
	 */
	public function admin_scripts() {
		global $post, $current_tab;

		$this->init_props();

		// The scripts needed for loading wc-pos-admin.
		$wc_pos_admin_scripts = [
			'jquery',
			'jquery-ui-core',
			'jquery-ui-datepicker',
			'jquery-blockui',
			'jquery-tiptip',
			'wc-enhanced-select',
			'editor',
			'thickbox',
			'postbox',
		];
		if ( wp_script_is( 'woocommerce_admin' ) ) {
			$wc_pos_admin_scripts[] = 'woocommerce_admin';
		}

		// Register admin scripts.
		wp_register_script( 'qrcode', WC_POS()->plugin_url() . '/assets/vendor/qrcode.min.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_register_script( 'anysearch', WC_POS()->plugin_url() . '/assets/vendor/anysearch.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_register_script( 'less-js', WC_POS()->plugin_url() . '/assets/vendor/less.min.js', [], WC_POS_VERSION, true );
		wp_register_script( 'jquery-cardswipe', WC_POS()->plugin_url() . '/assets/vendor/jquery.cardswipe.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_register_script( 'printd', WC_POS()->plugin_url() . '/assets/vendor/printd.min.js', [], WC_POS_VERSION, true );
		wp_register_script( 'wc-pos-quick-edit', WC_POS()->plugin_url() . '/assets/dist/js/admin/quick-edit.min.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_register_script( 'wc-pos-reports', WC_POS()->plugin_url() . '/assets/dist/js/admin/reports.min.js', [ 'woocommerce_admin' ], WC_POS_VERSION, true );
		wp_register_script( 'wc-pos-admin', WC_POS()->plugin_url() . '/assets/dist/js/admin/admin.min.js', $wc_pos_admin_scripts, WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-admin',
			'wc_pos_params',
			/**
			 * Filters wc_pos_params.
			 *
			 * @since 5.0.0
			 */
			apply_filters(
				'wc_pos_params',
				[
					'ajax_url'                         => admin_url( 'admin-ajax.php' ),
					'admin_url'                        => admin_url(),
					/**
					 * Filter: woocommerce_ajax_loader_url.
					 *
					 * @since 5.0.0
					 */
					'ajax_loader_url'                  => apply_filters( 'woocommerce_ajax_loader_url', WC()->plugin_url() . '/assets/images/ajax-loader@2x.gif' ),
					'search_products_and_variations'   => wp_create_nonce( 'search-products' ),
					'search_customers'                 => wp_create_nonce( 'search-customers' ),
					'check_user_card_uniqueness_nonce' => wp_create_nonce( 'check-user-card-uniqueness' ),
					'paymentsense_eod_report_nonce'    => wp_create_nonce( 'paymentsense-eod-report' ),
					'i18n_confirm_delete_register'     => __( 'Orders placed by the deleted register will be assigned to the Default Register.', 'woocommerce-point-of-sale' ),
					'i18n_confirm_delete_registers'    => __( 'Orders placed by the deleted registers will be assigned to the Default Register.', 'woocommerce-point-of-sale' ),
				]
			)
		);

		wp_register_script( 'wc-pos-admin-analytics', WC_POS()->plugin_url() . '/assets/dist/js/admin/analytics.min.js', [ 'wp-hooks', 'wp-i18n' ], WC_POS_VERSION, true );
		wp_set_script_translations( 'wc-pos-admin-analytics', 'woocommerce-point-of-sale' );
		wp_localize_script(
			'wc-pos-admin-analytics',
			'wc_pos_admin_analytics_params',
			[
				'registers' => $this->get_post_lables( 'pos_register' ),
				'outlets'   => $this->get_post_lables( 'pos_outlet' ),
				'data'      => [
					'default_outlet_id'   => (int) get_option( 'wc_pos_default_outlet', 0 ),
					'manage_outlet_stock' => 'yes' === get_option( 'wc_pos_manage_outlet_stock', 'no' ),
				],
			]
		);

		wp_register_script( 'wc-pos-admin-meta-boxes', WC_POS()->plugin_url() . '/assets/dist/js/admin/meta-boxes.min.js', [ 'jquery', 'wc-enhanced-select', 'selectWoo' ], WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-admin-meta-boxes',
			'wc_pos_admin_meta_boxes_params',
			[
				'countries'                      => wp_json_encode( array_merge( WC()->countries->get_allowed_country_states(), WC()->countries->get_shipping_country_states() ) ),
				'base_address_1'                 => WC()->countries->get_base_address(),
				'base_address_2'                 => WC()->countries->get_base_address_2(),
				'base_city'                      => WC()->countries->get_base_city(),
				'base_postcode'                  => WC()->countries->get_base_postcode(),
				'base_country'                   => WC()->countries->get_base_country(),
				'base_state'                     => '*' === WC()->countries->get_base_state() ? '' : WC()->countries->get_base_state(),
				'i18n_select_state_text'         => esc_attr__( 'Select an option&hellip;', 'woocommerce-point-of-sale' ),
				'i18n_email_error'               => __( 'Please enter in a valid email address.', 'woocommerce-point-of-sale' ),
				'i18n_phone_error'               => __( 'Please enter in a valid phone number.', 'woocommerce-point-of-sale' ),
				'i18n_fax_error'                 => __( 'Please enter in a valid fax number.', 'woocommerce-point-of-sale' ),
				'i18n_url_error'                 => __( 'Please enter in a valid URL.', 'woocommerce-point-of-sale' ),
				'i18n_confirm_use_store_address' => __( 'Are you sure you want to fill out the fields from the store address?', 'woocommerce-point-of-sale' ),
			]
		);

		wp_register_script( 'wc-pos-admin-grids', WC_POS()->plugin_url() . '/assets/dist/js/admin/grids.min.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-admin-grids',
			'wc_pos_admin_grids_params',
			[
				'grid_id'               => isset( $post->ID ) ? $post->ID : '',
				'grid_tile_nonce'       => wp_create_nonce( 'grid-tile' ),
				'i18n_delete_all_tiles' => esc_js( __( 'Are you sure you want to delete all tiles in this grid? This cannot be undone.', 'woocommerce-point-of-sale' ) ),
				'i18n_delete_tile'      => esc_js( __( 'Are you sure you want to delete this tile? This cannot be undone.', 'woocommerce-point-of-sale' ) ),
			]
		);

		wp_register_script( 'wc-pos-admin-receipts', WC_POS()->plugin_url() . '/assets/dist/js/admin/receipts.min.js', [ 'jquery', 'wp-codemirror', 'wc-pos-admin' ], WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-admin-receipts',
			'wc_pos_admin_receipts_params',
			[
				'receipt_id'                => isset( $_GET['post'] ) ? (int) $_GET['post'] : '',
				'update_receipt_nonce'      => wp_create_nonce( 'update-receipt' ),
				'i18n_field_name_empty'     => __( 'The field “Receipt Name” cannot be empty.', 'woocommerce-point-of-sale' ),
				'i18n_field_width_empty'    => __( 'The field “Receipt Width” cannot be empty.', 'woocommerce-point-of-sale' ),
				'i18n_field_width_negative' => __( 'The field “Receipt Width” cannot be a negative value.', 'woocommerce-point-of-sale' ),
			]
		);

		wp_register_script( 'wc-pos-admin-receipt', WC_POS()->plugin_url() . '/assets/dist/js/admin/receipt.min.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-admin-receipt',
			'wc_pos_admin_receipt_params',
			[
				'options' => [],
				'data'    => [],
				'i18n'    => [],
			]
		);

		wp_register_script( 'wc-pos-barcode-options', WC_POS()->plugin_url() . '/assets/dist/js/admin/barcode-options.min.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-barcode-options',
			'wc_pos_barcode',
			[
				'ajax_url'                    => WC()->ajax_url(),
				'product_for_barcode_nonce'   => wp_create_nonce( 'product_for_barcode' ),
				'remove_item_notice'          => __( 'Are you sure you want to remove the selected items?', 'woocommerce-point-of-sale' ),
				'select_placeholder_category' => __( 'Search for a category&hellip;', 'woocommerce-point-of-sale' ),
				'print_css_url'               => WC_POS()->plugin_url() . '/assets/dist/css/print.min.css', // Bad.

			]
		);

		wp_register_script( 'wc-pos-admin-settings', WC_POS()->plugin_url() . '/assets/dist/js/admin/settings.min.js', [ 'jquery' ], WC_POS_VERSION, true );
		wp_localize_script(
			'wc-pos-admin-settings',
			'wc_pos_admin_settings_params',
			[
				'time'        => time(),
				'i18n_note'   => __( 'Note', 'woocommerce-point-of-sale' ),
				'i18n_coin'   => __( 'Coin', 'woocommerce-point-of-sale' ),
				'i18n_remove' => __( 'Remove', 'woocommerce-point-of-sale' ),
			]
		);

		// Load the necessary assets for the media JS APIs.
		if (
			in_array( $this->screen_id, [ 'pos_receipt' ], true ) ||
			( $this->wc_screen_id . '_page_wc-settings' === $this->screen_id && 'point-of-sale' === $current_tab )
		) {
			wp_enqueue_media();
		}

		// Admin pages that are created/modified by the plugin.
		if ( in_array( $this->screen_id, wc_pos_get_screen_ids(), true ) ) {
			wp_enqueue_script( 'postbox' );
			wp_enqueue_script( 'wc-pos-admin' );
		}

		// Product page.
		if ( in_array( $this->screen_id, [ 'product' ], true ) ) {
			wp_enqueue_script( 'wc-pos-admin-meta-boxes' );
		}

		// Reports page.
		if ( $this->wc_screen_id . '_page_wc-reports' === $this->screen_id && isset( $_GET['tab'] ) && 'pos' === $_GET['tab'] ) {
			wp_enqueue_script( 'wc-pos-reports' );
		}

		// Barcodes page.
		if ( $this->wc_pos_screen_id . '_page_wc-pos-barcodes' === $this->screen_id ) {
			wp_enqueue_script( 'jquery-cardswipe' );
			wp_enqueue_script( 'qrcode' );
			wp_enqueue_script( 'wc-pos-barcode-options' );
		}

		// Stock controller page.
		if ( $this->wc_pos_screen_id . '_page_wc-pos-stock-controller' === $this->screen_id ) {
			wp_enqueue_script( 'anysearch' );
		}

		// Profile and User edit page.
		if ( in_array( $this->screen_id, [ 'profile', 'user-edit' ], true ) ) {
			wp_enqueue_script( 'jquery-cardswipe' );
		}

		// Our custom post type pages.
		if ( in_array( $this->screen_id, [ 'pos_register', 'pos_outlet', 'pos_grid' ], true ) ) {
			wp_enqueue_script( 'wc-admin-meta-boxes' );
			wp_enqueue_script( 'wc-pos-admin-meta-boxes' );
		}

		// Add/edit outlets.
		if ( 'pos_outlet' === $this->screen_id ) {
			wp_enqueue_script( 'wc-users' );
		}

		// Add/edit grids.
		if ( 'pos_grid' === $this->screen_id ) {
			wp_enqueue_script( 'wc-backbone-modal' );
			wp_enqueue_script( 'wc-pos-admin-grids' );
		}

		// Add/edit receipt.
		if ( 'pos_receipt' === $this->screen_id ) {
			wp_enqueue_code_editor( [] );
			wp_enqueue_script( 'customize-controls' );
			wp_enqueue_script( 'wc-pos-admin-receipts' );
			wp_enqueue_script( 'wc-pos-lib-receipt', WC_POS()->plugin_url() . '/lib/receipt/dist/receipt.iife.js', [], WC_POS_VERSION, [ 'in_footer' => false ] );
		}

		// Settings page.
		if ( $this->wc_screen_id . '_page_wc-settings' === $this->screen_id && 'point-of-sale' === $current_tab ) {
			wp_enqueue_script( 'wp-color-picker' );
			wp_enqueue_script( 'wc-pos-admin' );
			wp_enqueue_script( 'wc-pos-admin-settings' );
		}

		// Anlaytics.
		if ( class_exists( 'Automattic\WooCommerce\Admin\PageController' ) && \Automattic\WooCommerce\Admin\PageController::is_admin_page() ) {
			wp_enqueue_script( 'wc-pos-admin-analytics' );
		}

		// Quick edit products.
		if ( in_array( $this->screen_id, [ 'edit-product', true ], true ) ) {
			wp_enqueue_script( 'wc-pos-quick-edit' );
		}

		// Orders page.
		if ( $this->is_orders_page() ) {
			add_thickbox();
			wp_enqueue_script( 'printd' );
			wp_enqueue_script( 'wc-pos-lib-receipt', WC_POS()->plugin_url() . '/lib/receipt/dist/receipt.iife.js', [], WC_POS_VERSION, [ 'in_footer' => false ] );
			wp_enqueue_script( 'wc-pos-admin' );
			wp_enqueue_script( 'wc-pos-admin-receipt' );
		}
	}

	private function is_orders_page() {
		$is_post_type_orders_page = in_array( $this->screen_id, [ 'shop_order', 'edit-shop_order' ], true );
		$is_orders_page           = $this->wc_screen_id . '_page_wc-orders' === $this->screen_id;

		return $is_post_type_orders_page || $is_orders_page;
	}

	/**
	 * Returns an array of post labels for a given post type.
	 *
	 * @param string $type Post type.
	 * @return array
	 */
	protected function get_post_lables( $type = 'post' ) {
		$get_posts = get_posts(
			[
				'post_type'   => $type,
				'numberposts' => -1,
				'orderby'     => 'post_name',
				'order'       => 'asc',
			]
		);
		$result    = [];

		foreach ( $get_posts as $post ) {
			$result[] = [
				'id'    => intval( $post->ID ),
				'label' => $post->post_title,
			];
		}

		return $result;
	}
}

return new WC_POS_Admin_Assets();
