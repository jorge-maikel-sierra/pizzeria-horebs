=== YITH Point of Sale for WooCommerce ===

== Changelog ==

= 2.9.0 - Released on 28 December 2022 =

* New: support for WooCommerce 7.3
* Update: YITH plugin framework

= 2.8.0 - Released on 15 December 2022 =

* New: support for WooCommerce 7.2
* Update: YITH plugin framework
* Fix: rounding calculation issue when applying discounts

= 2.7.0 - Released on 15 November 2022 =

* New: support for WooCommerce 7.1
* New: support for WordPress 6.1
* New: option to set the maximum number of results to be shown when searching products in POS
* New: logout link in choose store and register page
* Tweak: show payment method in case no billing address is set
* Tweak: focus on input field after adding to cart a variable product by scanning it
* Tweak: improved support to WooCommerce Analytics feature, showing a notice if it's not enabled
* Tweak: hide tax row in orders having no taxes
* Tweak: added UTF-8 BOM (Byte-order mark) when downloading CSV files
* Tweak: added permission controls for managers to allow them viewing only their own register sessions
* Update: YITH plugin framework
* Fix: support for YITH WooCommerce PDF Invoice and Shipping List
* Fix: patched security vulnerability
* Dev: filter yith_pos_product_search_results_per_page
* Dev: filter yith_pos_disable_mobile_keyboard_when_scanning

= 2.6.0 - Released on 06 October 2022 =

* New: support for WooCommerce 7.0
* Update: YITH plugin framework

= 2.5.0 - Released on 11 September 2022 =

* New: support for WooCommerce 6.9
* Update: YITH plugin framework

= 2.4.0 - Released on 19 July 2022 =

* New: support for WooCommerce 6.8
* Update: YITH plugin framework
* Fix: date shown in daily reports in Order History
* Dev: new filter "yith_pos_get_category_query_options"

= 2.3.2 - Released on 19 July 2022 =

* Fix: issue when the site is installed in a subfolder
* Fix: issue showing daily reports on the 'Order history' page

= 2.3.1 - Released on 13 July 2022 =

* Update: YITH plugin framework
* Fix: dashboard issue in combination with WooCommerce 6.7
* Dev: upgraded react-router-dom to version 6.3

= 2.3.0 - Released on 07 July 2022 =

* New: support for WooCommerce 6.7
* Update: YITH plugin framework
* Fix: order formatted date and time in order history and in receipts
* Dev: added yith_pos_numeric_controller_handle_keydown_custom action

= 2.2.0 - Released on 17 June 2022 =

* New: support for WooCommerce 6.6
* Update: YITH plugin framework
* Fix: issue when using POS discounts in orders containing products created on the fly with the 'sync with WooCommerce' option disabled
* Dev: new filter 'yith_pos_default_new_customer_data'

= 2.1.2 - Released on 25 May 2022 =

* New: German translation

= 2.1.1 - Released on 24 May 2022 =

* Tweak: replaced 'barcode' param with 'yith_pos_scan' when searching products through REST API, to prevent issues with other plugins using the same param
* Dev: new filter yith_pos_get_countries

= 2.1.0 - Released on 12 May 2022 =

* New: support for WordPress 6.0
* New: support for WooCommerce 6.5
* Fix: next page loading in the variation selector
* Fix: stock status issue when multi-stock is enabled and the online product is out-of-stock
* Fix: cashiers cannot create coupons from POS discounts
* Tweak: increase timeout before printing receipt for slow devices
* Tweak: improved style of stock badge in variations
* Tweak: hide stock badge on variable products if their stock depends on variations and multi-stock is enabled

= 2.0.1 - Released on 29 April 2022 =

* Update: YITH plugin framework
* Update: language files
* Fix: tax row shown twice in receipt
* Fix: issue when creating a new order from backend
* Tweak: improved style when loading additional orders in Order History
* Tweak: allow setting the POS page as Home Page
* Tweak: prevent issues when updating orders, if the related hook is fired using the first parameter only
* Tweak: fixed 'undefined index' issue in receipt preview template


= 2.0.0 - Released on 27 April 2022 =

* New: gift receipts
* New: view register sessions
* New: improved reports creation and download, by including new stats
* New: support to YITH WooCommerce PDF Invoice - allows using PDF Invoices billing fields on POS
* New: download reports for each register session
* New: option to choose whether to show prices including or excluding tax in the receipt
* New: option to choose whether to show tax line details in the receipt
* New: option to choose whether to show taxes in the receipt as a single total or itemized
* New: option to show/hide products' SKU in receipts
* New: show stock status labels when showing stock on registers
* New: use billing fields as shipping fields
* New: show selected customer name in cart
* New: update stock of loaded products in the register after placing an order
* New: show sold products in cashier reports
* New: customize the label for VAT number field
* New: option to show/hide VAT number field on frontend
* Update: YITH plugin framework
* Update: language files
* Fix: convert POS discounts into WooCommerce coupons to prevent issues with tax calculations
* Tweak: improved register usability when setting customer address
* Tweak: disabled 'trash' when deleting Stores, Registers, Receipts
* Tweak: improved select style
* Tweak: prevent issues with permalinks when WordPress is installed in a specific sub-directory
* Tweak: improved style of order history section when loading orders
* Tweak: improved product creation through POS
* Tweak: improved list table style on the backend for Stores, Registers, Receipts
* Tweak: fixed warning with PHP 8 for 'wakeup' magic method visibility
* Tweak: improved order details style when shown in modal
* Tweak: hide 'empty cart' button if cart is already empty
* Tweak: improved style of receipt settings page
* Tweak: removed 'YITH POS only' catalog visibility for products; you can simply use the 'hidden' catalog visibility

= 1.8.0 - Released on 04 April 2022 =

* New: support for WooCommerce 6.4
* Update: YITH plugin framework
* Fix: issue when removing 'POS results only' in catalog visibility
* Tweak: improved query to retrieve orders in POS Order History
* Dev: new hook 'yith_pos_after_store_register_form'

= 1.7.0 - Released on 09 March 2022 =

* New: support for WooCommerce 6.3
* Update: YITH plugin framework
* Dev: added 'yith_pos_order_history_show_load_more_button' filter

= 1.6.0 - Released on 10 February 2022 =

* New: support for WooCommerce 6.2
* New: added 'phone' field to customer shipping information
* New: option to allow showing shipping details in receipt
* New: show product meta data in order details and receipts
* Update: YITH plugin framework
* Fix: loading orders on scrolling in order history
* Tweak: avoid showing 'private' meta data for products in order details and receipts
* Dev: new filter 'yith_pos_new_customer_default_data', to allow filtering default data when creating a new customer from POS
* Dev: added 'yith_pos_receipt_show_order_item_note' filter to allow showing order item notes in receipts
* Dev: added 'yith_pos_total_stats_for_orders_excluded_statuses' filter, to allow excluding custom order statuses in register reports

= 1.5.0 - Released on 05 January 2022 =

* New: support for WooCommerce 6.1
* New: support for WordPress 5.9
* Update: YITH plugin framework

= 1.4.0 - Released on 01 December 2021 =

* New: support for WooCommerce 6.0
* Update: YITH plugin framework

= 1.3.0 - Released on 28 October 2021 =

* New: support for WooCommerce 5.9
* Update: YITH plugin framework
* Tweak: added conditional check to avoid fatal errors when cashier or user is removed
* Tweak: use specific info in the global var 'yithPOS' for payment gateways to avoid including all object properties

= 1.2.0 - Released on 11 October 2021 =

* New: support for WooCommerce 5.8
* Update: YITH plugin framework
* Tweak: improved performance when filtering online or POS orders


= 1.1.1 - Released on 27 September 2021 =

* Update: YITH plugin framework
* Update: language files
* Fix: debug info feature removed for all logged in users
* Fix: itemized taxes in customer and register reports

= 1.1.0 - Released on 10 September 2021 =

* New: support for WooCommerce 5.7
* Update: YITH plugin framework
* Update: language files
* Tweak: improved performance when filtering online or POS orders

= 1.0.20 - Released on 10 August 2021 =

* New: support for WooCommerce 5.6
* New: improved register and customer report with itemized taxes, tax total, net sales
* Update: YITH plugin framework
* Update: language files
* Fix: timezone issue when retrieving order count in cashier info and order stats on register closing
* Fix: rewrite rule issue with URLs starting with 'pos'
* Tweak: improved performance when retrieving order stats
* Tweak: improved performance when fetching categories in 'add product' form
* Tweak: added 'address 2' field in billing details
* Tweak: allow vertical scrolling for modals in small screens
* Dev: added yith_pos_search_results_product_name filter to allow filtering the product name in search results
* Dev: added yith_pos_search_use_exact_sku filter to allow filtering by using the exact SKU or not when searching by SKU is enabled
* Dev: added yith_pos_search_by_title_arg filter to allow filtering the title argument in query when searching by SKU and title

= 1.0.19 - Released on 1 July 2021 =

* New: support for WordPress 5.8
* New: support for WooCommerce 5.5
* Update: YITH plugin framework
* Update: language files
* Fix: issue with timezone when retrieving order count in register stats
* Fix: coupon discount total shown in order details based on tax settings
* Tweak: search by SKU showed multiple results
* Dev: added yith_pos_search_by_sku_arg filter to manipulate the query on search value

= 1.0.18 - Released on 10 June 2021 =

* Update: YITH plugin framework
* Update: language files
* Fix: 'robots' meta for standard site pages

= 1.0.17 - Released on 3 June 2021 =

* New: support for WooCommerce 5.4
* Update: YITH plugin framework
* Update: language files
* Fix: search by barcode
* Tweak: added "noindex" and "noarchive" to "robots" meta tag to avoid search engine indexing for the POS page
* Dev: added yith_pos_query_custom_barcode_search filter

= 1.0.16 - Released on 10 May 2021 =

* New: support for WooCommerce 5.3
* Update: YITH plugin framework
* Update: language files
* Fix: order item price when applying coupons
* Fix: timezone issue when showing dates
* Fix: search by barcode
* Dev: added yith_pos_wc_settings filter

= 1.0.15 - Released on 15 April 2021 =

* New: support for WooCommerce 5.2
* Update: YITH plugin framework
* Update: language files
* Fix: issue when filtering products by category on barcode scanning
* Tweak: set register status to 'publish' when it's restored from trash
* Tweak: sort variations by the custom ordering set on product edit page
* Dev: added yith_pos_register_manager_get_totals filter
* Dev: added yith_pos_cart_generated_order filter
* Dev: added yith_pos_product_variations_query_args filter

= 1.0.14 - Released on 5 March 2021 =

* New: support for WordPress 5.7
* New: support for WooCommerce 5.1
* New: show payment methods in order details
* New: show payment methods in receipts
* New: show change in order details
* New: show change in receipts
* Update: YITH plugin framework
* Update: language files
* Fix: show notes in order items
* Fix: issue with dark color
* Fix: login time issue with Safari
* Fix: issue with saved carts
* Fix: issue when generating cart ID

= 1.0.13 - Released on 4 February 2021 =

* New: support for WooCommerce 5.0
* Update: YITH plugin framework
* Update: language files
* Fix: issue with saved carts
* Fix: date issue when timezone offset is negative
* Fix: issue with custom colors in rgb format
* Dev: added yith_pos_customer_info_box_shipping_required_fields filter

= 1.0.12 - Released on 30 Dec 2020 =

* New: support for WooCommerce 4.9
* Update: plugin framework
* Update: language files
* Fix: issue with timezone when grouping orders by date in order history

= 1.0.11 - Released on 02 Dec 2020 =

* New: support for WordPress 5.6
* New: support for WooCommerce 4.8
* Update: plugin framework
* Update: language files
* Fix: empty cashier label when creating the default receipt
* Fix: notice when taking-over the register
* Fix: login time based on the site timezone
* Dev: added yith_pos_customer_info_box_details filter
* Dev: added yith_pos_receipt_order_data_elements filter

= 1.0.10 - Released on 30 Oct 2020 =

* New: support for WooCommerce 4.7
* Update: plugin framework
* Update: language files
* Fix: menu background overlay after closing the calculator
* Tweak: fixed notice for catalog visibility on variations

= 1.0.9 - Released on 07 Oct 2020 =

* New: show 'Total Sales' in dashboard
* Update: plugin framework
* Update: language files
* Fix: 'Customers' tab in dashboard

= 1.0.8 - Released on 06 Oct 2020 =

* New: support for WooCommerce 4.6
* Update: plugin framework
* Update: language files
* Fix: store VAT field in customer billing and in order billing address
* Fix: check int values for quantities in POS Cart
* Dev: added yith_pos_cart_raw_cart_item_key filter
* Dev: added yith_pos_receipt_before_tax_line filter

= 1.0.7 - Released on 17 Sep 2020 =

* New: support for WooCommerce 4.5
* Update: plugin framework
* Update: language files

= 1.0.6 - Released on 13 Ago 2020 =

* New: support for WordPress 5.5
* Update: plugin framework
* Update: language files
* Fix: meta_data issue in combination with WooCommerce 4.3.2
* Fix: issue when creating a new user through POS in combination with YITH WooCommerce Customize My Account Page
* Fix: issue when calculating Popular Tendered for some currencies such as 'Mauritian rupee'
* Fix: show fee and discounts in order details
* Fix: take Refunds into account when retrieving reports
* Fix: issue when importing products with Catalog Visibility set to 'POS results only'
* Tweak: stylized focused fields in Manage Cash
* Tweak: show order note in order details and receipts
* Tweak: changed label for Receipt option in registers and title of the default receipt automatically created
* Tweak: improved receipt print
* Dev: added yith_pos_receipt_show_order_note filter
* Dev: added filters for getters of Store and Receipt
* Dev: added yith_pos_allow_out_of_stock_products_when_scanning filter
* Dev: added yith_pos_header_links filter
* Dev: added yith_pos_dashboard_order_charts filter

= 1.0.5 - Released on 03 Jul 2020 =

* New: support for WooCommerce 4.3
* Update: plugin framework
* Update: language files
* Fix: scrolling issues in category view
* Fix: tax rounding issue
* Fix: issues when some payment methods have empty amount when paying through POS
* Fix: scan product by SKU when there are restrictions for categories in Register
* Tweak: prevent notices when retrieving orders through REST API
* Tweak: added login messages and errors
* Tweak: improved search speed
* Tweak: set the default value for 'tax status' field to 'Enabled' when creating a new product in POS
* Tweak: improved search by SKU when scanning a product
* Tweak: fixed style issue in placeholders of select fields in Registers
* Tweak: limit the 'Popular Tendered' suggestions to 6 to prevent style issues
* Dev: added yith_pos_order_processed_after_showing_details action
* Dev: added yith_pos_default_selected_payment_gateway filter
* Dev: added yith_pos_coupon_custom_discount_amount filter
* Dev: added yith_pos_coupon_custom_discounts_array filter
* Dev: added yith_pos_is_product_coupon filter
* Dev: added yith_pos_is_cart_coupon filter
* Dev: added yith_pos_coupon_is_valid_for_product filter
* Dev: added yith_pos_coupon_is_valid_for_cart filter
* Dev: added yith_pos_cart_item_product_name filter
* Dev: added yith_pos_show_stock_badge_in_search_results filter
* Dev: added yith_pos_receipt_order_item_name_quantity filter
* Dev: added yith_pos_header_menu_items filter
* Dev: added yith_pos_receipt_order_item_price filter
* Dev: added yith_pos_product_list_query_args filter
* Dev: added yith_pos_product_section_tabs filter
* Dev: added yith_pos_search_include_variations filter
* Dev: added yith_pos_search_include_searching_by_sku filter
* Dev: added yith_pos_scan_product_tab_active_default filter
* Dev: added yith_pos_new_product_default_data filter
* Dev: added yith_pos_customer_to_update filter
* Dev: added yith_pos_customer_use_email_as_username filter
* Dev: added yith_pos_customer_to_create filter
* Dev: added yith_pos_cart_item_product_price filter in react

= 1.0.4 - Released on 14 May 2020 =

* New: support for WooCommerce 4.2
* New: restock items automatically after refunds
* Update: plugin framework
* Update: language files
* Fix: issue when adding cash-in-end and closing the register
* Fix: issue when editing customer
* Dev: added yith_pos_product_get_meta filter in React
* Dev: added yith_pos_show_price_including_tax_in_receipt filter
* Dev: added yith_pos_show_tax_row_in_receipt filter

= 1.0.3 - Released on 22 April 2020 =

* New: support for WooCommerce 4.1
* New: French translation (thanks to Josselyn Jayant)
* New: Greek translation
* Fix: show dates in correct language
* Fix: empty search field after scanning a product
* Fix: issue when changing order status for orders including custom products
* Fix: issue when reducing the stock of products without multi-stock options set
* Fix: search results width and height in small screens
* Fix: RTL style
* Fix: undefined variable error in store wizard summary
* Fix: issue when activating the plugin in the network
* Tweak: improved popular tendered behavior
* Tweak: prevent register-closing call failure by waiting for closing before redirect
* Dev: added yith_pos_show_itemized_tax_in_receipt filter

= 1.0.2 - Released on 3 March 2020 =

* New: support for WordPress 5.4
* New: support for WooCommerce 4.0
* New: show prices including/excluding taxes based on WooCommerce settings
* New: italian translation
* New: spanish translation
* New: dutch translation
* Update: plugin framework
* Fix: language option in combination with WPML
* Fix: multi-stock option in Product Edit page
* Fix: show correct currency in 'cash in hand' window
* Fix: show iOS body class for iOS devices only
* Fix: multi-stock issue with variable products
* Tweak: improved search
* Tweak: remove 'Cashier' and 'Manager' roles automatically whenever users are removed from Cashiers or Managers from the store settings.

= 1.0.1 - Released on 13 February 2020 =

* New: order status set to 'Processing' if the order includes shipping lines, otherwise it'll be set to 'Completed'
* Fix: password issue when creating a customer
* Fix: issue with admin capabilities
* Tweak: improved category exclusion in registers
* Tweak: improved barcode behaviour after scanning the product
* Tweak: filter by YITH POS or online shown as select
* Tweak: added a default receipt when installing the plugin for the first time
* Tweak: prevent errors if using an outdated version of WooCommerce Admin
* Tweak: added control to check if the browser is supported
* Tweak: improved style
* Tweak: removed mandatory option for pos gateway payments on WooCommerce Settings Payment
* Tweak: play sound when changing product quantity
* Dev: added yith_pos_order_status filter

= 1.0.0 - Released on 05 February 2020 =

* Initial release
