export declare type ReceiptType = 'order' | 'cart' | 'preview';
export declare interface ReceiptDataItemMetaData {
    key: string;
    value: string;
}
export declare interface ReceiptDataItemProductCategory {
    ancestors: number[];
    children: number[];
    id: number;
    name: string;
    parent: number;
    slug: string;
}
export declare interface ReceiptDataItemItemisedQuantity {
    quantity: number;
    total: number;
}
export declare interface ReceiptDataItem {
    image: string | null;
    item_subtotal: number;
    item_total: number;
    itemised_quantity: ReceiptDataItemItemisedQuantity[];
    line_subtotal: number;
    line_total: number;
    metadata: ReceiptDataItemMetaData[];
    name: string;
    original_subtotal?: number;
    product_categories: ReceiptDataItemProductCategory[];
    product_id: number;
    quantity: number;
    sku: string;
}
export declare interface ReceiptDataShipping {
    method_id: string;
    method_title: string;
}
export declare interface ReceiptDataTotal {
    key: string;
    label: string;
    value: number | string;
}
export declare interface ReceiptDataTax {
    label: string;
    rate: string;
    value: number;
}
export declare interface ReceiptDataClerk {
    id: number;
    display_name: string;
    user_nicename: string;
    user_login: string;
}
export declare interface ReceiptDataOutlet {
    name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    postcode?: string;
    country?: string;
    state?: string;
    phone?: string;
    fax?: string;
    email?: string;
    website?: string;
    wifi_network?: string;
    wifi_password?: string;
    social_accounts?: Record<string, string>;
}
export declare interface ReceiptDataRegister {
    name?: string;
}
export declare interface ReceiptDataOrderMetaData {
    key: string;
    value: string;
}
export declare interface ReceiptDataOrder {
    customer_note?: string;
    date_created_gmt?: string;
    id: number;
    needs_payment?: boolean;
    number: string;
    order_note?: string;
    payment_method?: string;
    payment_method_title?: string;
    status?: string;
    meta_data: ReceiptDataOrderMetaData[];
}
export declare interface ReceiptDataRefund {
    id: number;
    refunded_by: ReceiptDataClerk;
    reason: string;
    date_created_gmt: string;
}
export declare interface ReceiptDataBillingAddress {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
}
export declare interface ReceiptDataShippingAddress {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
}
export declare type ReceiptDataAddress = ReceiptDataShippingAddress | ReceiptDataBillingAddress;
export declare interface ReceiptDataCustomer {
    name: string;
    shipping: ReceiptDataShippingAddress;
    billing: ReceiptDataBillingAddress;
}
export interface ReceiptDataAddressFormats {
    default: string;
    [name: string]: string;
}
export interface ReceiptDataCountryState {
    code: string;
    name: string;
}
export interface ReceiptDataCountry {
    code: string;
    name: string;
    states: ReceiptDataCountryState[];
}
export interface ReceiptDataMoneyFormatOptions {
    currency_symbol: string;
    format: string;
    precision: number;
    decimal_separator: string;
    thousand_separator: string;
}
export declare interface ReceiptDataCheckoutOrderField {
    custom: boolean;
    enabled: boolean;
    key: string;
    label: string;
    options: Record<string, string>;
    plceholder: string;
    priority: number;
    required: boolean;
    type: string;
    validate: string[];
}
export declare interface ReceiptData {
    address_formats: ReceiptDataAddressFormats;
    checkout_order_fields: ReceiptDataCheckoutOrderField[];
    clerk?: ReceiptDataClerk;
    countries: ReceiptDataCountry[];
    custom_checkout_fields: boolean;
    customer: ReceiptDataCustomer;
    dining_option?: string;
    full_name_format: string;
    gift?: boolean;
    gmt_offset: number;
    hold?: boolean;
    items: ReceiptDataItem[];
    locale: string;
    money_format_options: ReceiptDataMoneyFormatOptions;
    order?: ReceiptDataOrder;
    outlet?: ReceiptDataOutlet;
    placeholder_img_src: string;
    refund?: ReceiptDataRefund;
    register?: ReceiptDataRegister;
    shipping?: ReceiptDataShipping;
    shop_name?: string;
    signature?: string;
    tax_enabled: boolean;
    tax_number?: string;
    taxes: ReceiptDataTax[];
    totals: ReceiptDataTotal[];
}
export type ReceiptCopyType = 'normal' | 'gift';
export interface ReceiptCopyContext {
    additional?: boolean;
    items: ReceiptDataItem[];
    itemsTitle?: string;
    type: ReceiptCopyType;
}
export declare type ReceiptOptions = {
    additional_prints_hidden_fields: string[];
    barcode_type: 'code128' | 'qrcode';
    cashier_name_format: 'user_nicename' | 'display_name' | 'user_login';
    checkout_fields: string[];
    custom_css: string;
    footer_text: string;
    header_text: string;
    logo: string | null;
    logo_position: 'left' | 'right' | 'center';
    logo_size: 'small' | 'normal' | 'large';
    num_copies: number;
    order_date_format: string;
    order_time_format: string;
    outlet_details_position: 'left' | 'right' | 'center';
    print_copies: 'num_copies' | 'per_category' | 'per_product' | 'per_quantity';
    product_details_layout: 'single' | 'multiple';
    show_cashier_name: boolean;
    show_currency_symbol: boolean;
    show_customer_billing_address: boolean;
    show_customer_email: boolean;
    show_customer_name: boolean;
    show_customer_phone: boolean;
    show_customer_shipping_address: boolean;
    show_num_items: boolean;
    show_order_barcode: boolean;
    show_order_date: boolean;
    show_order_status: boolean;
    show_outlet_address: boolean;
    show_outlet_contact_details: boolean;
    show_outlet_name: boolean;
    show_product_cost: boolean;
    show_product_discount: boolean;
    show_product_original_price: boolean;
    show_product_image: boolean;
    show_product_sku: boolean;
    show_register_name: boolean;
    show_shop_name: boolean;
    show_social_facebook: boolean;
    show_social_instagram: boolean;
    show_social_snapchat: boolean;
    show_social_twitter: boolean;
    show_tax_number: boolean;
    show_tax_summary: boolean;
    show_title: true;
    show_wifi_details: boolean;
    social_details_position: 'header' | 'footer';
    tax_number_label: string;
    tax_number_position: 'left' | 'right' | 'center';
    text_size: 'tiny' | 'small' | 'normal' | 'large';
    title_position: 'left' | 'right' | 'center';
    type: 'normal' | 'html';
    width: number;
};
export declare interface ReceiptI18n {
    [name: string]: string;
}
export declare interface Receipt {
    type: ReceiptType;
    data: ReceiptData;
    i18n: ReceiptI18n;
    options: ReceiptOptions;
}
