<?php
/**
 * The Template for displaying the "Your Store Tools" tab
 *
 * @var array $items
 * @package    YITH\PluginFramework\Templates
 */

defined( 'ABSPATH' ) || exit;
?>

<div id="yith-plugin-fw__panel__your-store-tools-tab" class="yith-plugin-fw__panel__content__page yith-plugin-fw__panel__content__page--your-store-tools">
	<div class="yith-plugin-fw__panel__content__page__heading">
		<div class="yith-plugin-fw__panel__your-store-tools-tab__header">
			<img class="yith-plugin-fw__panel__your-store-tools-tab__header__logo" src="<?php echo esc_url( YIT_CORE_PLUGIN_URL . '/assets/images/yith-logo.svg' ); ?>"/>
			<div class="yith-plugin-fw__panel__your-store-tools-tab__header__title">
				<?php echo wp_kses_post( __( '#1 Independent Seller of <mark>WooCommerce plugins</mark>', 'yith-plugin-fw' ) ); ?>
			</div>
		</div>
		<div class="yith-plugin-fw__panel__content__page__description">
			<?php echo wp_kses_post( __( 'Additional tools <mark>you need</mark> to boost your store', 'yith-plugin-fw' ) ); ?>
		</div>
	</div>
	<div class="yith-plugin-fw__panel__content__page__container">
		<div class="items">
			<?php foreach ( $items as $item ) : ?>
				<div class="item">
					<div class="header">
						<img class="icon" src="<?php echo esc_attr( $item['icon_url'] ); ?>"/>
						<div class="name">
							<?php echo esc_html( $item['name'] ); ?>
						</div>
						<div class="status">
							<?php if ( $item['is_active'] ) : ?>
								<div class="active-status">
									<?php echo esc_html( _x( 'Active', 'Plugin in "Your Store Tools" tab', 'yith-plugin-fw' ) ); ?>
								</div>
							<?php else : ?>
								<a class="get-it" href="<?php echo esc_attr( $item['url'] ); ?>">
									<?php echo esc_html( _x( 'Get it!', 'Plugin in "Your Store Tools" tab', 'yith-plugin-fw' ) ); ?>
								</a>
							<?php endif; ?>
						</div>
					</div>
					<div class="description">
						<?php echo wp_kses_post( $item['description'] ); ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
