<?php
/**
 * Receipt Customizer - Preview
 *
 * @var object $receipt_object
 * @var string $logo_src
 *
 * @package WooCommerce_Point_Of_Sale/Admin/Views
 */
$app_data = WC_POS_App::instance()->get_app_data(
	(int) get_option( 'wc_pos_default_register' ),
	(int) get_option( 'wc_pos_default_outlet' ),
	(int) get_option( 'wc_pos_default_receipt' ),
	(int) get_option( 'wc_pos_default_grid' )
);

$order_meta_data = array_map(
	function ( $key, $field ) {
		switch ( $field['type'] ) {
			case 'checkbox':
				return [
					'key'   => $key,
					'value' => '1',
				];
				break;
			case 'multiselect':
				return [
					'key'   => $key,
					'value' => __( 'Value 1, Value 2', 'woocommerce-point-of-sale' ),
				];
				break;
			default:
				return [
					'key'   => $key,
					'value' => __( 'Value', 'woocommerce-point-of-sale' ),
				];
		}
	},
	array_keys( WC()->checkout->get_checkout_fields( 'order' ) ),
	array_values( WC()->checkout->get_checkout_fields( 'order' ) )
);

$order_data = [
	'order_note'           => __( 'This is an order note.', 'woocommerce-point-of-sale' ),
	'customer_note'        => __( 'This is a customer note.', 'woocommerce-point-of-sale' ),
	'date_created_gmt'     => gmdate( 'Y-m-d H:i:s', time() ),
	'id'                   => 1234,
	'needs_payment'        => false,
	'number'               => 'POS-1234',
	'payment_method'       => 'pos_cash',
	'payment_method_title' => __( 'Cash', 'woocommerce-point-of-sale' ),
	'status'               => __( 'Processing', 'woocommerce-point-of-sale' ),
	'meta_data'            => $order_meta_data,
];

$customer = [
	'name'     => __( 'John Doe', 'woocommerce-point-of-sale' ),
	'billing'  => [
		'first_name' => __( 'John', 'woocommerce-point-of-sale' ),
		'last_name'  => __( 'Doe', 'woocommerce-point-of-sale' ),
		'company'    => __( 'Acme Corp Ltd.', 'woocommerce-point-of-sale' ),
		'address_1'  => __( '1 Old Street', 'woocommerce-point-of-sale' ),
		'address_2'  => '',
		'city'       => __( 'London', 'woocommerce-point-of-sale' ),
		'postcode'   => __( 'EC1 1T', 'woocommerce-point-of-sale' ),
		'country'    => __( 'UK', 'woocommerce-point-of-sale' ),
		'state'      => __( 'England', 'woocommerce-point-of-sale' ),
		'email'      => 'customer@example.com',
		'phone'      => '+44 5678 123456',
	],
	'shipping' => [
		'first_name' => __( 'John', 'woocommerce-point-of-sale' ),
		'last_name'  => __( 'Doe', 'woocommerce-point-of-sale' ),
		'company'    => __( 'Acme Corp Ltd.', 'woocommerce-point-of-sale' ),
		'address_1'  => __( '1 Old Street', 'woocommerce-point-of-sale' ),
		'address_2'  => '',
		'city'       => __( 'London', 'woocommerce-point-of-sale' ),
		'postcode'   => __( 'EC1 1T', 'woocommerce-point-of-sale' ),
		'country'    => __( 'UK', 'woocommerce-point-of-sale' ),
		'state'      => __( 'England', 'woocommerce-point-of-sale' ),
	],
];

$signature = 'data:image/png;base64,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';

$outlet   = $app_data['pos']['outlet'];
$register = $app_data['pos']['register'];

$clerk = [
	'id'            => 1,
	'display_name'  => __( 'Jane Doe', 'woocommerce-point-of-sale' ),
	'user_nicename' => __( 'Jane', 'woocommerce-point-of-sale' ),
	'user_login'    => __( 'janedoe', 'woocommerce-point-of-sale' ),
];

$items = [
	[
		'image'              => $app_data['wc']['placeholder_img_src'],
		'item_subtotal'      => 149,
		'item_total'         => 129,
		'itemised_quantity'  => [
			[
				'quantity' => 1,
				'total'    => 129,
			],
			[
				'quantity' => 1,
				'total'    => 129,
			],
		],

		'line_subtotal'      => 298,
		'line_total'         => 258,
		'metadata'           => [
			[
				'key'   => __( 'Color', 'woocommerce-point-of-sale' ),
				'value' => __( 'Sliver', 'woocommerce-point-of-sale' ),
			],
		],
		'name'               => __( 'Mobile Phone', 'woocommerce-point-of-sale' ),
		'original_subtotal'  => 299,
		'product_categories' => [
			[
				'ancestors' => [],
				'children'  => [],
				'id'        => 1,
				'name'      => __( 'Phones', 'woocommerce-point-of-sale' ),
				'parent'    => 0,
				'slug'      => 'phones',
			],
		],
		'product_id'         => 1,
		'quantity'           => 2,
		'sku'                => 'abc24',
	],
];

$shipping = [
	'method_id'    => 'standard',
	'method_title' => __( 'Standard', 'woocommerce-point-of-sale' ),
];

$order_totals = [
	[
		'label' => __( 'Items Subtotal', 'woocommerce-point-of-sale' ),
		'key'   => 'subtotal',
		'value' => 298,
	],
	[
		'label' => __( 'Discounts & Coupons', 'woocommerce-point-of-sale' ),
		'key'   => 'discounts',
		'value' => -40,
	],
	[
		'label' => __( 'Fees', 'woocommerce-point-of-sale' ),
		'key'   => 'fees',
		'value' => 5,
	],
	[
		'label' => __( 'Shipping', 'woocommerce-point-of-sale' ),
		'key'   => 'shipping',
		'value' => 10,
	],
	[
		'label' => __( 'Tax', 'woocommerce-point-of-sale' ),
		'key'   => 'total_tax',
		'value' => 25.8,
	],
	[
		'label' => __( 'Order Total', 'woocommerce-point-of-sale' ),
		'key'   => 'total',
		'value' => 298.8,
	],
	[
		'label' => __( 'Tendered', 'woocommerce-point-of-sale' ),
		'key'   => 'tendered_amount',
		'value' => 300,
	],
	[
		'label' => __( 'Change', 'woocommerce-point-of-sale' ),
		'key'   => 'change_amount',
		'value' => 1.2,
	],
	[
		'label' => __( 'Number of Items', 'woocommerce-point-of-sale' ),
		'key'   => 'items_count',
		'value' => '4',
	],
];

$taxes = [
	[
		'label' => __( 'VAT', 'woocommerce-point-of-sale' ),
		'rate'  => '10%',
		'value' => 25.8,
	],
];

$data = [
	'shop_name'              => $receipt_object->get_name(),
	'signature'              => $signature,
	'hold'                   => false,
	'gift'                   => true,
	'register'               => $register,
	'outlet'                 => $outlet,
	'order'                  => $order_data,
	'customer'               => $customer,
	'items'                  => $items,
	'shipping'               => $shipping,
	'totals'                 => $order_totals,
	'taxes'                  => $taxes,
	'dining_option'          => 'take_away',
	'clerk'                  => $clerk,
	'tax_number'             => $app_data['pos']['tax_number'],
	'locale'                 => $app_data['wp']['locale'],
	'gmt_offset'             => $app_data['wp']['gmt_offset'],
	'address_formats'        => $app_data['wc']['address_formats'],
	'countries'              => $app_data['wc']['countries'],
	'full_name_format'       => $app_data['pos']['full_name_format'],
	'checkout_order_fields'  => $app_data['wc']['checkout_order_fields'],
	'custom_checkout_fields' => $app_data['pos']['custom_checkout_fields'],
	'money_format_options'   => [
		'currency_symbol'    => $app_data['wc']['currency_format_symbol'],
		'format'             => $app_data['wc']['currency_format'],
		'precision'          => $app_data['wc']['price_decimals'],
		'decimal_separator'  => $app_data['wc']['price_decimal_separator'],
		'thousand_separator' => $app_data['wc']['price_thousand_separator'],
	],
	'tax_enabled'            => true,
];

	$i18n    = $app_data['i18n'];
	$options = $app_data['pos']['receipt'];
?>
<script>
	(function($) {
		const receipt = document.createElement( 'app-receipt' );

		receipt.setAttribute('i18n', JSON.stringify(<?php echo wp_json_encode( $i18n ); ?>))
		receipt.setAttribute('data', JSON.stringify(<?php echo wp_json_encode( $data ); ?>))
		receipt.setAttribute('options', JSON.stringify(<?php echo wp_json_encode( $options ); ?>))
		receipt.setAttribute('type', 'order')

		$('#print-receipt-preview-display').append(receipt)
	})(jQuery);
</script>
