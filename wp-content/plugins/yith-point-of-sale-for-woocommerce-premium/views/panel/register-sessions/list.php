<?php
/**
 * List register sessions
 *
 * @author  YITH
 * @package YITH\POS\Views
 */

defined( 'YITH_POS' ) || exit();

if ( ! class_exists( 'YITH_POS_Register_Session_List_Table' ) ) {
	require_once YITH_POS_INCLUDES_PATH . 'admin/list-tables/class-yith-pos-register-session-list-table.php';
}
$list_table = new YITH_POS_Register_Session_List_Table();
?>
<h2><?php esc_html_e( 'Register Sessions', 'yith-point-of-sale-for-woocommerce' ); ?></h2>
<?php
$list_table->prepare_items();
$list_table->views();
?>
<form method="post">
	<div id="yith-pos-register-session-list" class="yith-plugin-ui--classic-wp-list-style">
		<?php $list_table->display(); ?>
	</div>
</form>
