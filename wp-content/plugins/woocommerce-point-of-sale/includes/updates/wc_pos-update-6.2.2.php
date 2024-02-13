<?php
/**
 * Database Update Script for 6.2.2
 *
 * @package WooCommerce_Point_Of_Sale/Updates
 */
defined( 'ABSPATH' ) || exit;

// Set default values for the new receipt options.
$receipts = $wpdb->get_results( "SELECT p.ID as id FROM $wpdb->posts p WHERE p.post_type = 'pos_receipt'" );
foreach ( $receipts as $receipt ) {
	add_post_meta( (int) $receipt->id, 'show_currency_symbol', 'yes', true );
	add_post_meta( (int) $receipt->id, 'additional_prints_hidden_fields', 'clerk_name,customer_name,product_price,product_sku', true );
}

// Restructure cash flow in the database.
$sessions = $wpdb->get_results(
	"SELECT p.ID as id,
	pm_user.meta_value as user,
	pm_ts.meta_value as ts,
	pm_ct.meta_value as amount,
	pm_cn.meta_value as note
	FROM $wpdb->posts p
	LEFT JOIN $wpdb->postmeta pm_user ON pm_user.post_id = p.ID AND pm_user.meta_key = 'open_first'
	LEFT JOIN $wpdb->postmeta pm_ts ON pm_ts.post_id = p.ID AND pm_ts.meta_key = 'date_opened'
	LEFT JOIN $wpdb->postmeta pm_ct ON pm_ct.post_id = p.ID AND pm_ct.meta_key = 'opening_cash_total'
	LEFT JOIN $wpdb->postmeta pm_cn ON pm_cn.post_id = p.ID AND pm_cn.meta_key = 'opening_note'
	WHERE p.post_type = 'pos_session'
	"
);

foreach ( $sessions as $session ) {
	$user = get_user_by( 'id', (int) $session->user );

	add_post_meta(
		(int) $session->id,
		'cash_flow',
		[
			[
				'amount'    => $session->amount ? (float) $session->amount : 0,
				'note'      => $session->note ? (string) $session->note : '',
				'timestamp' => $session->ts ? (float) $session->ts : 0,
				'user'      => [
					'id'   => $user ? $user->ID : 0,
					'name' => $user ? $user->display_name : '',
				],
			],
		],
		true
	);

	delete_post_meta( (int) $session->id, 'opening_cash_total' );
	delete_post_meta( (int) $session->id, 'opening_note' );
}

// Deprecate the use of `_original_price` in favor of `_item_discount` and address issues with
// incorrect values when store prices are tax inclusive.
$results = $wpdb->get_results(
	"SELECT
	p.ID as order_id,
	order_items.order_item_id as order_item_id,
	im_original_price.meta_value as original_price,
	im_line_subtotal.meta_value as line_subtotal,
	im_line_subtotal_tax.meta_value as line_subtotal_tax,
	im_qty.meta_value as qty
	FROM wp_posts p
	LEFT JOIN wp_woocommerce_order_items order_items ON order_items.order_id = p.ID
	LEFT JOIN wp_woocommerce_order_itemmeta im_original_price ON im_original_price.order_item_id = order_items.order_item_id AND im_original_price.meta_key = '_original_price'
	LEFT JOIN wp_woocommerce_order_itemmeta im_line_subtotal ON im_line_subtotal.order_item_id = order_items.order_item_id AND im_line_subtotal.meta_key = '_line_subtotal'
	LEFT JOIN wp_woocommerce_order_itemmeta im_line_subtotal_tax ON im_line_subtotal_tax.order_item_id = order_items.order_item_id AND im_line_subtotal_tax.meta_key = '_line_subtotal_tax'
	LEFT JOIN wp_woocommerce_order_itemmeta im_qty ON im_qty.order_item_id = order_items.order_item_id AND im_qty.meta_key = '_qty'
	WHERE p.post_type = 'shop_order' AND im_original_price.meta_value IS NOT NULL;
	"
);

foreach ( $results as $result ) {
	// If prices are inclusive of tax, adjust '_original_price' to accurately reflect the original
	// price without tax.
	$line_subtotal     = (float) $result->line_subtotal;
	$line_subtotal_tax = (float) $result->line_subtotal_tax;
	$qty               = (float) $result->qty;
	$original_price    = (float) $result->original_price;

	$item_subtotal = wc_prices_include_tax()
		? ( $line_subtotal + $line_subtotal_tax ) / $qty
		: $line_subtotal / $qty;

	$item_discount = ( $item_subtotal / $original_price ) * 100;

	wc_delete_order_item_meta( (int) $result->order_item_id, '_original_price', '', true );
	wc_add_order_item_meta( (int) $result->order_item_id, '_item_discount', $item_discount, true );
}
