<?php
/**
 * Plugin Name: YITH Point of Sale for WooCommerce
 * Plugin URI: https://yithemes.com/themes/plugins/yith-point-of-sale-for-woocommerce
 * Description: <code><strong>YITH Point of Sale for WooCommerce</strong></code> allows you to turn your WooCommerce installation into an easy to use and powerful cash register for each type of store or business. <a href="https://yithemes.com/" target="_blank">Get more plugins for your e-commerce shop on <strong>YITH</strong></a>
 * Author: YITH
 * Text Domain: yith-point-of-sale-for-woocommerce
 * Domain Path: /languages/
 * Version: 2.9.0
 * Author URI: https://yithemes.com/
 * Requires at least: 5.9
 * Tested up to: 6.1.x
 * WC requires at least: 7.1
 * WC tested up to: 7.3
 *
 * @author  YITH
 * @package YITH Point of Sale for WooCommerce
 * @version 2.8.0
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'is_plugin_active' ) ) {
	require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

if ( ! function_exists( 'yith_pos_install_woocommerce_admin_notice' ) ) {
	/**
	 * Print a notice if WooCommerce is not installed.
	 *
	 * @author Emanuela Castorina <emanuela.castorina@yithemes.com>
	 */
	function yith_pos_install_woocommerce_admin_notice() {
		?>
		<div class="error">
			<p>
				<?php
				// translators: %s is the plugin name.
				echo sprintf( esc_html__( '%s is enabled but not effective. It requires WooCommerce in order to work.', 'yith-point-of-sale-for-woocommerce' ), esc_html( YITH_POS_PLUGIN_NAME ) );
				?>
			</p>
		</div>
		<?php
	}
}

if ( ! function_exists( 'yith_plugin_registration_hook' ) ) {
	require_once 'plugin-fw/yit-plugin-registration-hook.php';
}
register_activation_hook( __FILE__, 'yith_plugin_registration_hook' );

if ( ! function_exists( 'yith_plugin_onboarding_registration_hook' ) ) {
	include_once 'plugin-upgrade/functions-yith-licence.php';
}
register_activation_hook( __FILE__, 'yith_plugin_onboarding_registration_hook' );

! defined( 'YITH_POS' ) && define( 'YITH_POS', true );
! defined( 'YITH_POS_VERSION' ) && define( 'YITH_POS_VERSION', '2.9.0' );
! defined( 'YITH_POS_INIT' ) && define( 'YITH_POS_INIT', plugin_basename( __FILE__ ) );
! defined( 'YITH_POS_FILE' ) && define( 'YITH_POS_FILE', __FILE__ );
! defined( 'YITH_POS_URL' ) && define( 'YITH_POS_URL', plugins_url( '/', __FILE__ ) );
! defined( 'YITH_POS_DIR' ) && define( 'YITH_POS_DIR', plugin_dir_path( __FILE__ ) );
! defined( 'YITH_POS_ASSETS_URL' ) && define( 'YITH_POS_ASSETS_URL', YITH_POS_URL . 'assets' );
! defined( 'YITH_POS_REACT_URL' ) && define( 'YITH_POS_REACT_URL', YITH_POS_URL . 'dist' );
! defined( 'YITH_POS_ASSETS_PATH' ) && define( 'YITH_POS_ASSETS_PATH', YITH_POS_DIR . 'assets' );
! defined( 'YITH_POS_TEMPLATE_PATH' ) && define( 'YITH_POS_TEMPLATE_PATH', YITH_POS_DIR . 'templates/' );
! defined( 'YITH_POS_LANGUAGES_PATH' ) && define( 'YITH_POS_LANGUAGES_PATH', YITH_POS_DIR . 'languages/' );
! defined( 'YITH_POS_VIEWS_PATH' ) && define( 'YITH_POS_VIEWS_PATH', YITH_POS_DIR . 'views/' );
! defined( 'YITH_POS_INCLUDES_PATH' ) && define( 'YITH_POS_INCLUDES_PATH', YITH_POS_DIR . 'includes/' );
! defined( 'YITH_POS_SLUG' ) && define( 'YITH_POS_SLUG', 'yith-point-of-sale-for-woocommerce' );
! defined( 'YITH_POS_SECRET_KEY' ) && define( 'YITH_POS_SECRET_KEY', 'O7qviMFTu56qJiHvjPyS' );
! defined( 'YITH_POS_PLUGIN_NAME' ) && define( 'YITH_POS_PLUGIN_NAME', 'YITH Point of Sale for WooCommerce' );
if ( ! defined( 'YITH_POS_COOKIEHASH' ) ) {
	$site_url = get_site_option( 'siteurl' );
	$hash     = ! ! $site_url ? md5( $site_url ) : '';
	define( 'YITH_POS_COOKIEHASH', defined( 'COOKIEHASH' ) ? COOKIEHASH : $hash );
}
! defined( 'YITH_POS_REGISTER_COOKIE' ) && define( 'YITH_POS_REGISTER_COOKIE', 'yith_pos_register_' . YITH_POS_COOKIEHASH );

require_once YITH_POS_INCLUDES_PATH . 'class.yith-pos-post-types.php';
require_once YITH_POS_INCLUDES_PATH . 'functions.yith-pos.php';
register_activation_hook( __FILE__, array( 'YITH_POS_Post_Types', 'handle_roles_and_capabilities' ) );
register_activation_hook( __FILE__, array( 'YITH_POS_Post_Types', 'create_default_receipt' ) );

if ( ! function_exists( 'yith_pos_install' ) ) {
	/**
	 * Check WC installation
	 *
	 * @author Emanuela Castorina <emanuela.castorina@yithemes.com>
	 */
	function yith_pos_install() {
		if ( ! function_exists( 'WC' ) ) {
			add_action( 'admin_notices', 'yith_pos_install_woocommerce_admin_notice' );
		} else {
			do_action( 'yith_pos_init' );
		}
	}
}
add_action( 'plugins_loaded', 'yith_pos_install', 11 );

if ( ! function_exists( 'yith_pos_init' ) ) {
	/**
	 * Let's start the game
	 *
	 * @author Emanuela Castorina <emanuela.castorina@yithemes.com>
	 */
	function yith_pos_init() {
		load_plugin_textdomain( 'yith-point-of-sale-for-woocommerce', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

		require_once YITH_POS_INCLUDES_PATH . 'traits/trait-yith-pos-singleton.php';
		require_once YITH_POS_INCLUDES_PATH . 'class.yith-pos.php';

		// Let's start the game!
		yith_pos();
	}
}
add_action( 'yith_pos_init', 'yith_pos_init' );


/* Plugin Framework Version Check */
if ( ! function_exists( 'yit_maybe_plugin_fw_loader' ) && file_exists( YITH_POS_DIR . 'plugin-fw/init.php' ) ) {
	require_once YITH_POS_DIR . 'plugin-fw/init.php';
}
yit_maybe_plugin_fw_loader( YITH_POS_DIR );
