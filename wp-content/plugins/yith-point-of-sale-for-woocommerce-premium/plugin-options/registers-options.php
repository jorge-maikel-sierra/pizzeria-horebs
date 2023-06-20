<?php
/**
 * Options
 *
 * @author  YITH
 * @package YITH\POS\Options
 */

defined( 'YITH_POS' ) || exit;

$registers = array(
	'registers' => array(
		'registers-tabs' => array(
			'type'     => 'multi_tab',
			'sub-tabs' => array(
				'registers-all-registers'     => array(
					'title' => __( 'All Registers', 'yith-point-of-sale-for-woocommerce' ),
				),
				'registers-register-sessions' => array(
					'title' => __( 'Register Sessions', 'yith-point-of-sale-for-woocommerce' ),
				),
			),
		),
	),
);

return apply_filters( 'yith_pos_panel_registers_tab', $registers );
