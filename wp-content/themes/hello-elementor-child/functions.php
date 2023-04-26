<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );
         
if ( !function_exists( 'child_theme_configurator_css' ) ):
    function child_theme_configurator_css() {
        wp_enqueue_style( 'chld_thm_cfg_child', trailingslashit( get_stylesheet_directory_uri() ) . 'style.css', array( 'hello-elementor','hello-elementor','hello-elementor-theme-style' ) );
    }
endif;
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

// END ENQUEUE PARENT ACTION
// 
add_filter( 'woocommerce_checkout_fields' , 'remove_state_fields_checkout' );

function remove_state_fields_checkout( $fields ) {
    unset( $fields['shipping']['shipping_state'] );
    unset( $fields['shipping']['shipping_company'] );
	unset( $fields['shipping']['shipping_vat'] );
	unset( $fields['shipping']['shipping_country'] );
	unset( $fields['shipping']['shipping_city'] );
	unset( $fields['shipping']['shipping_state'] );
	unset( $fields['shipping']['shipping_postcode'] );
	
	unset( $fields['billing']['billing_state'] );
    unset( $fields['billing']['billing_company'] );
	unset( $fields['billing']['billing_vat'] );
	unset( $fields['billing']['billing_country'] );
	unset( $fields['billing']['billing_city'] );
	unset( $fields['billing']['billing_state'] );
	unset( $fields['billing']['billing_postcode'] );
	
    return $fields;
}

