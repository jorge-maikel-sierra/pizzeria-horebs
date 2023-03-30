<?php
/**
 * REST API functions
 *
 * @author  YITH
 * @package YITH\POS\RestApi
 */

namespace YITH\POS\RestApi;

defined( 'ABSPATH' ) || exit;

/**
 * Get SQL clauses for filters.
 *
 * @param array  $query_args                Query args.
 * @param string $table_name                The table name.
 * @param false  $maybe_include_order_check Set true to include order check.
 *
 * @return object
 */
function get_sql_clauses_for_filters( $query_args, $table_name, $maybe_include_order_check = false ) {

	$clauses = (object) array(
		'from'  => '',
		'where' => '',
	);

	$meta_value = 0;
	$meta_key   = '';

	$register = isset( $query_args['register'] ) ? absint( $query_args['register'] ) : 0;
	$store    = $query_args['store'] ? absint( $query_args['store'] ) : 0;

	if ( $register ) {
		$meta_value = $register;
		$meta_key   = '_yith_pos_register';
	} elseif ( $store ) {
		$meta_value = $store;
		$meta_key   = '_yith_pos_store';
	} elseif ( $maybe_include_order_check ) {
		$meta_value = 1;
		$meta_key   = '_yith_pos_order';
	}

	if ( $meta_value && $meta_key ) {
		global $wpdb;
		$post_meta      = $wpdb->postmeta;
		$post_meta_name = 'pm_filters_clause';

		// Include the 'parent_id' to consider also Refunds, since in case of refunds, the POS meta are set in the parent order.
		$clauses->from  = " JOIN {$post_meta} as {$post_meta_name} ON ( {$post_meta_name}.post_id = {$table_name}.order_id OR {$post_meta_name}.post_id = {$table_name}.parent_id )";
		$clauses->where = " {$post_meta_name}.meta_key = '{$meta_key}' AND {$post_meta_name}.meta_value = '{$meta_value}'";
	}

	return $clauses;
}

/**
 * Get 'where' clause for order filters.
 *
 * @param array  $query_args                Query args.
 * @param string $table_name                The table name.
 * @param false  $maybe_include_order_check Set true to include order check.
 *
 * @return string
 */
function get_sql_where_clause_for_order_filters( $query_args, $table_name, $maybe_include_order_check = false ) {

	$where      = '';
	$meta_value = 0;
	$meta_key   = '';

	$register = isset( $query_args['register'] ) ? absint( $query_args['register'] ) : 0;
	$store    = $query_args['store'] ? absint( $query_args['store'] ) : 0;

	if ( $register ) {
		$meta_value = $register;
		$meta_key   = '_yith_pos_register';
	} elseif ( $store ) {
		$meta_value = $store;
		$meta_key   = '_yith_pos_store';
	} elseif ( $maybe_include_order_check ) {
		$meta_value = 1;
		$meta_key   = '_yith_pos_order';
	}

	if ( $meta_value && $meta_key ) {
		global $wpdb;

		// todo: use cache for store query results.

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$orders = $wpdb->get_col( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key=%s AND meta_value=%d", $meta_key, $meta_value ) );

		if ( ! ! $orders ) {
			$orders    = array_map( 'absint', $orders );
			$orders_in = implode( ',', $orders );
			$where     = "{$table_name}.order_id IN ({$orders_in}) OR {$table_name}.parent_id IN ({$orders_in})";
		} else {
			$where = '1=0';
		}
	}

	return $where;
}
