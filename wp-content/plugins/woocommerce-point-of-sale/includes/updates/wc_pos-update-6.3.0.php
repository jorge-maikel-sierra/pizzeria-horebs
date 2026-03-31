<?php
/**
 * Database Update Script for 6.3.0
 *
 * @package WooCommerce_Point_Of_Sale/Updates
 */

defined( 'ABSPATH' ) || exit;

WC_POS_Install::remove_roles();
WC_POS_Install::create_roles();
