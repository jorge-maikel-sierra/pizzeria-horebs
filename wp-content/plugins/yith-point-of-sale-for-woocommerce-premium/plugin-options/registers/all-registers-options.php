<?php
/**
 * Options
 *
 * @author  YITH
 * @package YITH\POS\Options
 */

defined( 'YITH_POS' ) || exit;

return array(
	'registers-all-registers' => array(
		'registers-all-registers-list' => array(
			'type'          => 'post_type',
			'post_type'     => YITH_POS_Post_Types::REGISTER,
			'wp-list-style' => 'classic',
		),
	),
);
