<?php
/**
 * Admin Class.
 *
 * @author  YITH
 * @package YITH\POS\Classes
 */

defined( 'YITH_POS' ) || exit;

if ( ! class_exists( 'YITH_POS_Admin' ) ) {
	/**
	 * Class YITH_POS_Admin
	 *
	 * @author Leanza Francesco <leanzafrancesco@gmail.com>
	 * @author Emanuela Castorina <emanuela.castorina@yithemes.com>
	 */
	class YITH_POS_Admin {

		use YITH_POS_Singleton_Trait;

		/**
		 * Panel object.
		 *
		 * @var YIT_Plugin_Panel_WooCommerce
		 */
		private $panel;

		/**
		 * The panel page.
		 *
		 * @var string
		 */
		private $panel_page = 'yith_pos_panel';

		/**
		 * Store post type admin class.
		 *
		 * @var YITH_POS_Store_Post_Type_Admin
		 */
		public $store_post_type_admin;

		/**
		 * Magic getter to handle deprecations.
		 *
		 * @param string $key The key.
		 */
		public function __get( $key ) {
			switch ( $key ) {
				case 'receipt_post_type_admin':
					yith_pos_doing_it_wrong( $key, 'Post type admin classes should not accessed by YITH_POS_Admin class.', '2.0.0' );
					if ( class_exists( 'YITH_POS_Receipt_Post_Type_Admin' ) && is_callable( 'YITH_POS_Receipt_Post_Type_Admin::instance' ) ) {
						return YITH_POS_Receipt_Post_Type_Admin::instance();
					}
					break;
				case 'register_post_type_admin':
					yith_pos_doing_it_wrong( $key, 'Post type admin classes should not accessed by YITH_POS_Admin class.', '2.0.0' );
					if ( class_exists( 'YITH_POS_Register_Post_Type_Admin' ) && is_callable( 'YITH_POS_Register_Post_Type_Admin::instance' ) ) {
						return YITH_POS_Register_Post_Type_Admin::instance();
					}
					break;
				case 'store_post_type_admin':
					yith_pos_doing_it_wrong( $key, 'Post type admin classes should not accessed by YITH_POS_Admin class.', '2.0.0' );
					if ( class_exists( 'YITH_POS_Store_Post_Type_Admin' ) && is_callable( 'YITH_POS_Store_Post_Type_Admin::instance' ) ) {
						return YITH_POS_Store_Post_Type_Admin::instance();
					}
					break;
			}

			return null;
		}

		/**
		 * YITH_POS_Admin constructor.
		 */
		private function __construct() {

			YITH_POS_Register_Sessions_Admin::get_instance();

			add_action( 'admin_menu', array( $this, 'register_panel' ), 5 );
			add_action( 'admin_init', array( $this, 'add_metabox' ), 10 );

			add_filter( 'plugin_action_links_' . plugin_basename( YITH_POS_DIR . '/' . basename( YITH_POS_FILE ) ), array( $this, 'action_links' ) );
			add_filter( 'yith_show_plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 3 );

			add_action( 'yith_pos_dashboard_tab', array( $this, 'dashboard_tab' ) );

			add_filter( 'yith_plugin_fw_get_field_template_path', array( $this, 'add_custom_field_path' ), 20, 2 );

			add_action( 'admin_bar_menu', array( $this, 'admin_bar_menus' ), 32 );

			add_filter( 'woocommerce_admin_billing_fields', array( $this, 'add_billing_vat' ) );
			add_filter( 'woocommerce_customer_meta_fields', array( $this, 'add_billing_vat_meta_field' ) );

			// Order filter: yith-pos or online orders.
			add_action( 'restrict_manage_posts', array( $this, 'add_order_filters' ), 10, 1 );
			add_action( 'pre_get_posts', array( $this, 'filter_orders' ), 10, 1 );

			add_filter( 'woocommerce_payment_gateways_setting_columns', array( $this, 'gateway_enabled_pos_column' ), 10, 1 );
			add_action( 'woocommerce_payment_gateways_setting_column_status_pos', array( $this, 'gateway_pos_column_content' ), 10, 1 );

			add_action( 'pre_get_posts', array( $this, 'filter_post_types_for_managers' ) );
			add_filter( 'wp_count_posts', array( $this, 'count_post_types_for_managers' ), 10, 2 );

			// Show payment method in orders list (admin view) for POS orders with no billing address set.
			add_filter( 'woocommerce_order_get_formatted_billing_address', array( $this, 'show_payment_method_on_orders_list' ) );

		}

		/**
		 * Add the column Enabled on YITH POS on Gateway WooCommerce Settings.
		 *
		 * @param array $default_columns Default Columns.
		 *
		 * @return array
		 */
		public function gateway_enabled_pos_column( $default_columns ) {
			$i = array_search( 'status', array_keys( $default_columns ), true );
			if ( $i ++ ) {
				$default_columns = array_slice( $default_columns, 0, $i, true ) + array( 'status_pos' => __( 'Enabled on YITH POS', 'yith-point-of-sale-for-woocommerce' ) ) + array_slice( $default_columns, $i, count( $default_columns ) - $i, true );
			} else {
				$default_columns['status_pos'] = __( 'Enabled on YITH POS', 'yith-point-of-sale-for-woocommerce' );
			}

			return $default_columns;
		}

		/**
		 * Add on-off field on gateways table.
		 *
		 * @param WC_Payment_Gateway $gateway The gateway.
		 */
		public function gateway_pos_column_content( $gateway ) {

			$pos_gateways      = yith_pos_get_enabled_gateways_option();
			$required_gateways = (array) yith_pos_get_required_gateways();

			$method_title = $gateway->get_method_title() ? $gateway->get_method_title() : $gateway->get_title();
			$is_required  = in_array( $gateway->id, $required_gateways, true );

			echo '<td class="status_pos" width="5%">';
			if ( ! $is_required ) {
				echo '<a class="yith_pos_gateway_toggle_enable" href="' . esc_url( admin_url( 'admin.php?page=wc-settings&tab=checkout&section=' . strtolower( $gateway->id ) ) ) . '">';
			}

			if ( in_array( $gateway->id, $pos_gateways, true ) ) {
				// translators: %s is the payment gateway name.
				echo '<span class="woocommerce-input-toggle woocommerce-input-toggle--enabled_on_yith_pos" aria-label="' . esc_attr( sprintf( __( 'The "%s" payment method is currently enabled on YITH POS', 'yith-point-of-sale-for-woocommerce' ), $method_title ) ) . '">' . esc_attr__( 'Yes', 'yith-point-of-sale-for-woocommerce' ) . '</span>';
			} else {
				// translators: %s is the payment gateway name.
				echo '<span class="woocommerce-input-toggle woocommerce-input-toggle--disabled" aria-label="' . esc_attr( sprintf( __( 'The "%s" payment method is currently disabled on YITH POS', 'yith-point-of-sale-for-woocommerce' ), $method_title ) ) . '">' . esc_attr__( 'No', 'yith-point-of-sale-for-woocommerce' ) . '</span>';
			}
			if ( ! $is_required ) {
				echo '</a>';
			}

			echo '</td>';
		}

		/**
		 * Get the Panel tabs
		 *
		 * @return array
		 */
		public function get_panel_tabs() {
			$tabs_with_caps = array(
				'dashboard' => array(
					'title'      => __( 'Dashboard', 'yith-point-of-sale-for-woocommerce' ),
					'capability' => 'yith_pos_manage_pos_options',
				),
				'stores'    => array(
					'title'      => __( 'Stores', 'yith-point-of-sale-for-woocommerce' ),
					'capability' => yith_pos_get_post_capability( 'edit_posts', YITH_POS_Post_Types::STORE ),
				),
				'registers' => array(
					'title'      => __( 'Registers', 'yith-point-of-sale-for-woocommerce' ),
					'capability' => yith_pos_get_post_capability( 'edit_posts', YITH_POS_Post_Types::REGISTER ),
				),
				'receipts'  => array(
					'title'      => __( 'Receipts', 'yith-point-of-sale-for-woocommerce' ),
					'capability' => yith_pos_get_post_capability( 'edit_posts', YITH_POS_Post_Types::RECEIPT ),
				),
				'settings'  => array(
					'title'      => __( 'Customization', 'yith-point-of-sale-for-woocommerce' ),
					'capability' => 'yith_pos_manage_pos_options',
				),
			);

			$tabs_with_caps = apply_filters( 'yith_pos_settings_admin_tabs_with_caps', $tabs_with_caps );
			$tabs           = array();

			foreach ( $tabs_with_caps as $key => $tab ) {
				$capability = $tab['capability'] ?? 'yith_pos_manage_pos';
				if ( current_user_can( $capability ) ) {
					$tabs[ $key ] = $tab['title'];
				}
			}

			return apply_filters( 'yith_pos_settings_admin_tabs', $tabs );
		}

		/**
		 * Add a panel under YITH Plugins tab
		 *
		 * @use      YIT_Plugin_Panel_WooCommerce class
		 * @see      plugin-fw/lib/yit-plugin-panel-woocommerce.php
		 */
		public function register_panel() {

			if ( ! empty( $this->panel ) ) {
				return;
			}

			$admin_tabs = $this->get_panel_tabs();

			$args = array(
				'create_menu_page' => true,
				'parent_slug'      => '',
				'page_title'       => 'YITH Point of Sale for WooCommerce',
				'menu_title'       => 'Point of Sale',
				'capability'       => 'yith_pos_manage_pos',
				'parent'           => '',
				'parent_page'      => 'yit_plugin_panel',
				'class'            => yith_set_wrapper_class(),
				'page'             => $this->panel_page,
				'admin-tabs'       => $admin_tabs,
				'options-path'     => YITH_POS_DIR . '/plugin-options',
				'plugin_slug'      => YITH_POS_SLUG,
				'help_tab'         => array(
					'playlists' => array(
						'it' => 'https://www.youtube.com/watch?v=BA20jf6hBvg&list=PL9c19edGMs0_813AKcPSsfnrKsz0GWqFq',
					),
					'hc_url'    => 'https://support.yithemes.com/hc/en-us/categories/4402922216849-YITH-POINT-OF-SALE-FOR-WOOCOMMERCE-POS-',
				),
			);

			$this->panel = new YIT_Plugin_Panel_WooCommerce( $args );
		}

		/**
		 * Filter post types for managers.
		 *
		 * @param WP_Query $query The WP Query.
		 */
		public function filter_post_types_for_managers( $query ) {
			if (
				isset( $query->query['post_type'] ) &&
				in_array( $query->query['post_type'], array( YITH_POS_Post_Types::STORE, YITH_POS_Post_Types::REGISTER ), true ) &&
				! current_user_can( 'yith_pos_manage_others_pos' )
			) {

				if ( YITH_POS_Post_Types::STORE === $query->query['post_type'] ) {
					$query->set( 'meta_query', yith_pos_get_manager_stores_meta_query() );
				} elseif ( YITH_POS_Post_Types::REGISTER === $query->query['post_type'] ) {
					$manager_stores = yith_pos_get_manager_stores();
					$manager_stores = ! ! $manager_stores ? $manager_stores : array( 0 );
					$query->set(
						'meta_query',
						array(
							array(
								'key'     => '_store_id',
								'value'   => $manager_stores,
								'compare' => 'IN',
							),
						)
					);
				}
			}
		}

		/**
		 * Count post types for managers.
		 *
		 * @param array  $counts    List of counts.
		 * @param string $post_type The post type.
		 *
		 * @return array
		 */
		public function count_post_types_for_managers( $counts, $post_type ) {
			if (
				in_array( $post_type, array( YITH_POS_Post_Types::STORE, YITH_POS_Post_Types::REGISTER ), true ) &&
				! current_user_can( 'yith_pos_manage_others_pos' )
			) {
				$stati = get_post_stati();

				foreach ( $stati as $status ) {
					if ( YITH_POS_Post_Types::STORE === $post_type ) {
						$meta_query = yith_pos_get_manager_stores_meta_query();
					} else {
						$manager_stores = yith_pos_get_manager_stores();
						$manager_stores = ! ! $manager_stores ? $manager_stores : array( 0 );
						$meta_query     = array(
							array(
								'key'     => '_store_id',
								'value'   => $manager_stores,
								'compare' => 'IN',
							),
						);
					}
					$args            = array(
						'post_type'      => $post_type,
						'posts_per_page' => - 1,
						'fields'         => 'ids',
						'post_status'    => $status,
						'meta_query'     => $meta_query, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
					);
					$posts           = get_posts( $args );
					$counts->$status = count( $posts );
				}
			}

			return $counts;
		}

		/**
		 * Render tab
		 */
		public function dashboard_tab() {
			echo '</div><!-- /.wrap -->';
			echo "<div class='woocommerce-page' >";
			yith_pos_get_view( 'panel/dashboard.php' );
		}


		/**
		 * Add additional custom fields.
		 *
		 * @param string $field_template The field template.
		 * @param array  $field          The field.
		 *
		 * @return string
		 */
		public function add_custom_field_path( $field_template, $field ) {
			$custom_types = array(
				'show-categories',
				'show-products',
				'show-cashiers',
				'presets',
			);

			if ( in_array( $field['type'], $custom_types, true ) ) {
				$field_template = YITH_POS_VIEWS_PATH . '/fields/' . $field['type'] . '.php';
			}

			return $field_template;
		}

		/**
		 * Adds row meta.
		 *
		 * @param array    $row_meta_args Row meta arguments.
		 * @param string[] $plugin_meta   An array of the plugin's metadata,
		 *                                including the version, author,
		 *                                author URI, and plugin URI.
		 * @param string   $plugin_file   Path to the plugin file relative to the plugins directory.
		 *
		 * @return array
		 */
		public function plugin_row_meta( $row_meta_args, $plugin_meta, $plugin_file ) {
			if ( YITH_POS_INIT === $plugin_file ) {
				$row_meta_args['slug']       = YITH_POS_SLUG;
				$row_meta_args['is_premium'] = true;
			}

			return $row_meta_args;
		}

		/**
		 * Action Links
		 * add the action links to plugin admin page
		 *
		 * @param array $links The links.
		 *
		 * @return   array
		 * @use      plugin_action_links_{$plugin_file_name}
		 */
		public function action_links( $links ) {

			if ( function_exists( 'yith_add_action_links' ) ) {
				$links = yith_add_action_links( $links, $this->panel_page, true, YITH_POS_SLUG );
			}

			return $links;
		}

		/**
		 * Add the "Visit POST" link in admin bar main menu.
		 *
		 * @param WP_Admin_Bar $wp_admin_bar Admin bar instance.
		 *
		 * @since 2.4.0
		 */
		public function admin_bar_menus( $wp_admin_bar ) {
			if ( ! is_admin() || ! is_admin_bar_showing() ) {
				return;
			}

			// Show only when the user is a member of this site, or they're a super admin.
			if ( ! is_user_member_of_blog() && ! is_super_admin() ) {
				return;
			}

			// Don't display when shop page is the same of the page on front.
			if ( intval( get_option( 'page_on_front' ) ) === yith_pos_get_pos_page_id() ) {
				return;
			}

			// Add an option to visit the store.
			$wp_admin_bar->add_node(
				array(
					'parent' => 'site-name',
					'id'     => 'view-pos',
					'title'  => __( 'Visit POS', 'yith-point-of-sale-for-woocommerce' ),
					'href'   => yith_pos_get_pos_page_url(),
				)
			);
		}

		/**
		 * Add VAT inside the customer billing information.
		 *
		 * @param array $billing_fields Billing fields.
		 *
		 * @return array
		 */
		public function add_billing_vat( $billing_fields ) {
			$billing_fields['vat'] = array(
				'label' => yith_pos_get_vat_field_label(),
				'show'  => true,
			);

			return $billing_fields;
		}

		/**
		 * Add VAT inside the customer billing information.
		 *
		 * @param array $fields Customer fields.
		 *
		 * @return array
		 */
		public function add_billing_vat_meta_field( $fields ) {
			$fields['billing']['fields']['billing_vat'] = array(
				'label'       => yith_pos_get_vat_field_label(),
				'description' => '',
			);

			return $fields;
		}


		/**
		 * Add filters to orders for YITH_POS orders or online orders.
		 *
		 * @param string $post_type The post type.
		 */
		public function add_order_filters( $post_type ) {
			if ( 'shop_order' === $post_type ) {
				// phpcs:ignore WordPress.Security.NonceVerification.Recommended
				$selected_type = isset( $_REQUEST['yith_pos_order_type'] ) ? wc_clean( wp_unslash( $_REQUEST['yith_pos_order_type'] ) ) : '';

				$types = array(
					'pos'    => __( 'YITH POS', 'yith-point-of-sale-for-woocommerce' ),
					'online' => __( 'Online', 'yith-point-of-sale-for-woocommerce' ),
				);

				$placeholder    = esc_attr__( 'Filter by YITH POS or online', 'yith-point-of-sale-for-woocommerce' );
				$enhanced_attrs = implode(
					' ',
					array(
						"class='wc-enhanced-select'",
						"data-placeholder='{$placeholder}'",
						"data-allow_clear='true'",
						"aria-hidden='true'",
						"style='min-width:200px;'",
					)
				);
				echo "<select name='yith_pos_order_type' {$enhanced_attrs}>"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo "<option value='' />";
				foreach ( $types as $id => $name ) {
					echo '<option value="' . esc_attr( $id ) . '" ' . selected( $id, $selected_type, false ) . '>' . esc_html( $name ) . '</option>';
				}
				echo '</select>';
			}
		}

		/**
		 * Filter the the YITH_POS orders from the other online orders.
		 *
		 * @param WP_Query $query The WP query.
		 */
		public function filter_orders( $query ) {
			if ( $query->is_main_query() && isset( $query->query['post_type'] ) && 'shop_order' === $query->query['post_type'] ) {
				$meta_query = ! ! $query->get( 'meta_query' ) ? $query->get( 'meta_query' ) : array();
				$type       = wc_clean( wp_unslash( $_REQUEST['yith_pos_order_type'] ?? '' ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				$changed    = false;

				if ( 'pos' === $type ) {
					$changed      = true;
					$meta_query[] = array(
						'key'   => '_yith_pos_order',
						'value' => '1',
					);
				} elseif ( 'online' === $type ) {
					$changed      = true;
					$meta_query[] = array(
						'key'     => '_yith_pos_order',
						'compare' => 'NOT EXISTS',
					);
				}

				if ( $changed ) {
					$query->set( 'meta_query', $meta_query );
				}
			}
		}

		/**
		 * Add meta-box in the order editor
		 */
		public function add_metabox() {
			// phpcs:disable WordPress.Security.NonceVerification.Recommended

			$post_id = absint( $_REQUEST['post'] ?? $_REQUEST['post_ID'] ?? 0 );

			if ( ( isset( $_GET['post_type'] ) && 'shop_order' === $_GET['post_type'] ) || 'shop_order' === get_post_type( $post_id ) ) {
				$order = wc_get_order( $post_id );
				if ( ! $order ) {
					return;
				}

				$is_pos_order = $order->get_meta( '_yith_pos_order' );
				if ( empty( $is_pos_order ) || 'no' === $is_pos_order ) {
					return;
				}

				$html = $this->get_order_metabox_html( $order );
				$args = array(
					'label'    => __( 'POS Info', 'yith-point-of-sale-for-woocommerce' ),
					'pages'    => 'shop_order',
					'context'  => 'side',
					'priority' => 'high',
					'tabs'     => array(
						'settings' => array(
							'label'  => __( 'Settings', 'yith-point-of-sale-for-woocommerce' ),
							'fields' => array(
								'pos_info' => array(
									'type'  => 'html',
									'html'  => $html,
									'label' => '',
									'desc'  => '',
									'std'   => 'yes',
								),
							),
						),
					),
				);

				$metabox = YIT_Metabox( 'yith-pos-order' );
				$metabox->init( $args );
			}

			// phpcs:enable
		}

		/**
		 * Get the order meta-box HTML template.
		 *
		 * @param WC_Order $order The order.
		 *
		 * @return string
		 */
		private function get_order_metabox_html( $order ) {
			$store_id    = $order->get_meta( '_yith_pos_store' );
			$register_id = $order->get_meta( '_yith_pos_register' );
			$cashier_id  = $order->get_meta( '_yith_pos_cashier' );

			$store      = yith_pos_get_store( $store_id );
			$store_name = $store->get_name();

			$register      = yith_pos_get_register( $register_id );
			$register_name = $register instanceof YITH_POS_Register ? $register->get_name() : '';

			$cashier = get_user_by( 'id', $cashier_id );

			$args = array(
				'register_name'   => $register_name,
				'store_name'      => $store_name,
				'cashier'         => $cashier ? $cashier->first_name . ' ' . $cashier->last_name : '',
				'payment_methods' => yith_pos_get_order_payment_methods( $order ),
				'currency'        => $order->get_currency(),
			);

			ob_start();
			yith_pos_get_view( 'metabox/shop-order-pos-info-metabox.php', $args );

			return ob_get_clean();
		}

		/**
		 * Show payment method in case billing address is not set for the order
		 *
		 * @param string $address Formatted billing address.
		 *
		 * @return string
		 */
		public function show_payment_method_on_orders_list( $address ) {
			if ( empty( $address ) ) {
				$address = "\n";
			}
			return $address;
		}
	}
}

if ( ! function_exists( 'yith_pos_admin' ) ) {
	/**
	 * Unique access to instance of YITH_POS_Admin class
	 *
	 * @return YITH_POS_Admin
	 */
	function yith_pos_admin() {
		return YITH_POS_Admin::get_instance();
	}
}
