<?php
/**
 * Database Update Script for 6.4.0
 *
 * @package WooCommerce_Point_Of_Sale/Updates
 */

defined( 'ABSPATH' ) || exit;

global $wpdb;
$wpdb->hide_errors();

// Remove deprecated register meta.
$wpdb->query(
	"DELETE pm FROM {$wpdb->postmeta} pm
	LEFT JOIN {$wpdb->posts} p ON pm.post_id = p.ID
	WHERE p.post_type = 'pos_register'
	AND pm.meta_key IN ('date_opened', 'date_closed', 'open_first', 'open_last', 'paymentsense_terminal')"
);
