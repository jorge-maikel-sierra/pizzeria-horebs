<?php
/**
 * Options
 *
 * @author  YITH
 * @package YITH\POS\Options
 */

defined( 'YITH_POS' ) || exit;

$stores = array(
	'stores' => array(
		'stores_list' => array(
			'type'          => 'post_type',
			'post_type'     => YITH_POS_Post_Types::STORE,
			'wp-list-style' => 'classic',
		),
	),
);

return apply_filters( 'yith_pos_panel_stores_tab', $stores );
