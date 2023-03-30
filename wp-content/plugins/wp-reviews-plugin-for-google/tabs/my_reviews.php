<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
if(isset($_POST['save-highlight']))
{
check_admin_referer( 'save-noreg_'.$trustindex_pm_google->get_plugin_slug(), '_wpnonce_highlight_save' );
$id = null;
$start = null;
$length = null;
if(isset($_POST['id']))
{
$id = intval(sanitize_text_field($_POST['id']));
}
if(isset($_POST['start']))
{
$start = sanitize_text_field($_POST['start']);
}
if(isset($_POST['length']))
{
$length = sanitize_text_field($_POST['length']);
}
if($id)
{
$highlight = "";
if(!is_null($start))
{
$highlight = $start . ',' . $length;
}
$wpdb->query("UPDATE `". $trustindex_pm_google->get_tablename('reviews') ."` SET highlight = '$highlight' WHERE id = '$id'");
}
exit;
}
if(isset($_POST['review_download_request']))
{
delete_option($trustindex_pm_google->get_option_name('review-download-token'));
update_option($trustindex_pm_google->get_option_name('review-download-inprogress'), sanitize_text_field($_POST['review_download_request']), false);
update_option($trustindex_pm_google->get_option_name('review-manual-download'), intval($_POST['manual_download']), false);
if(isset($_POST['review_download_request_id']))
{
update_option($trustindex_pm_google->get_option_name('review-download-request-id'), sanitize_text_field($_POST['review_download_request_id']), false);
}
exit;
}
if(isset($_POST['review_download_timestamp']))
{
update_option($trustindex_pm_google->get_option_name('download-timestamp'), intval($_POST['review_download_timestamp']), false);
exit;
}
$reviews = [];
if($trustindex_pm_google->is_noreg_linked())
{
$reviews = $wpdb->get_results('SELECT * FROM `'. $trustindex_pm_google->get_tablename('reviews') .'` ORDER BY date DESC');
}
$is_review_download_in_progress = $trustindex_pm_google->is_review_download_in_progress();
$review_download_request_id = get_option($trustindex_pm_google->get_option_name('review-download-request-id'));
function trustindex_plugin_write_rating_stars($score)
{
global $trustindex_pm_google;
if($trustindex_pm_google->is_ten_scale_rating_platform())
{
return '<div class="ti-rating-box">'. $trustindex_pm_google->formatTenRating($score) .'</div>';
}
$text = "";
$link = "https://cdn.trustindex.io/assets/platform/".ucfirst("google")."/star/";
if(!is_numeric($score))
{
return $text;
}
for ($si = 1; $si <= $score; $si++)
{
$text .= '<img src="'. $link .'f.svg" class="ti-star" />';
}
$fractional = $score - floor($score);
if( 0.25 <= $fractional )
{
if ( $fractional < 0.75 )
{
$text .= '<img src="'. $link .'h.svg" class="ti-star" />';
}
else
{
$text .= '<img src="'. $link .'f.svg" class="ti-star" />';
}
$si++;
}
for (; $si <= 5; $si++)
{
$text .= '<img src="'. $link .'e.svg" class="ti-star" />';
}
return $text;
}
wp_enqueue_style('trustindex-widget-css', 'https://cdn.trustindex.io/assets/widget-presetted-css/4-light-background.css');
wp_enqueue_script('trustindex-review-js', 'https://cdn.trustindex.io/assets/js/trustindex-review.js', [], false, true);
wp_add_inline_script('trustindex-review-js', '
jQuery(".ti-review-content").TI_shorten({
"showLines": 2,
"lessText": "'. TrustindexPlugin_google::___("Show less") .'",
"moreText": "'. TrustindexPlugin_google::___("Show more") .'",
});
jQuery(".ti-review-content").TI_format();
');
$download_timestamp = get_option($trustindex_pm_google->get_option_name('download-timestamp'), time() - 1);
?>
<?php if(!$trustindex_pm_google->is_noreg_linked()): ?>
<div class="ti-notice notice-warning" style="margin-left: 0">
<p><?php echo TrustindexPlugin_google::___("Connect your %s platform to download reviews.", ["Google"]); ?></p>
</div>
<?php else: ?>
<?php if($trustindex_pm_google->is_trustindex_connected() && in_array($selected_tab, [ 'setup_no_reg', 'my_reviews' ])): ?>
<div class="ti-notice notice-warning" style="margin: 0 0 15px 0">
<p>
<?php echo TrustindexPlugin_google::___("You have connected your Trustindex account, so you can find premium functionality under the \"%s\" tab. You no longer need this tab unless you choose the limited but forever free mode.", ["Trustindex admin"]); ?>
</p>
</div>
<?php endif; ?>
<div class="ti-box">
<div class="ti-header"><?php echo TrustindexPlugin_google::___("My Reviews"); ?></div>
<?php if(!$is_review_download_in_progress): ?>
<div class="tablenav top" style="margin-bottom: 26px">
<div class="alignleft actions">
<?php if($download_timestamp < time()): ?>
<a href="?page=<?php echo esc_attr($_GET['page']); ?>&tab=setup_no_reg&refresh&my_reviews" class="btn-text btn-refresh btn-download-reviews" style="margin-left: 0" data-loading-text="<?php echo TrustindexPlugin_google::___("Loading") ;?>" data-delay=10><?php echo TrustindexPlugin_google::___("Download new reviews") ;?></a>
<?php else: ?>
<a href="#" class="btn-text btn-disabled" style="margin-left: 0; pointer-events: none"> <?php echo TrustindexPlugin_google::___("Download new reviews"); ?></a>
<div class="ti-notice notice-warning" style="margin: 0 0 15px 0">
<p style="margin: 6px 0">
<?php echo TrustindexPlugin_google::___('You have to wait to be able to update.'); ?>
 <a href="https://www.trustindex.io/frequently-asked-questions/#my-reviews-aren-t-updating"><?php echo TrustindexPlugin_google::___('Why?'); ?></a>
</p>
</div>
<?php endif; ?>
</div>
</div>
<div class="ti-notice notice-info" style="margin: 15px 0; display: none" id="ti-connect-info">
<p><?php echo TrustindexPlugin_google::___("A popup window should be appear! Please, go to there and continue the steps! (If there is no popup window, you can check the the browser's popup blocker)"); ?></p>
</div>
<?php $page_details = get_option( $trustindex_pm_google->get_option_name('page-details') ); ?>
<input type="hidden" id="ti-noreg-page-id" value="<?php echo esc_attr($page_details['id']); ?>" />
<input type="hidden" id="ti-noreg-webhook-url" value="<?php echo $trustindex_pm_google->get_webhook_url(); ?>" />
<input type="hidden" id="ti-noreg-email" value="<?php echo get_option('admin_email'); ?>" />
<input type="hidden" id="ti-noreg-version" value="9.8.5.1" />
<?php if(isset($page_details['access_token'])): ?>
<input type="hidden" id="ti-noreg-access-token" value="<?php echo esc_attr($page_details['access_token']); ?>" />
<?php endif; ?>
<?php
$review_download_token = get_option($trustindex_pm_google->get_option_name('review-download-token'));
if(!$review_download_token)
{
$review_download_token = wp_create_nonce('ti-noreg-connect-token');
update_option($trustindex_pm_google->get_option_name('review-download-token'), $review_download_token, false);
}
?>
<input type="hidden" id="ti-noreg-connect-token" name="ti-noreg-connect-token" value="<?php echo $review_download_token; ?>" />
<?php endif; ?>
<?php if(!$trustindex_pm_google->is_trustindex_connected() && $download_timestamp < time()): ?>
<div class="ti-notice notice-error" style="margin: 0 0 15px 0">
<p>
<?php echo TrustindexPlugin_google::___("Do not waste your time by updating manually!"); ?> <?php echo TrustindexPlugin_google::___("We will solve it for you, for less than the price of a slice of pepperoni pizza per month!"); ?> <a href="https://www.trustindex.io/ti-redirect.php?a=sys&c=wp-google-pizza"><?php echo TrustindexPlugin_google::___("Subscribe!"); ?> »</a>
</p>
</div>
<?php endif; ?>
<?php if($is_review_download_in_progress === 'error'): ?>
<div class="ti-notice notice-error" style="margin: 0 0 15px 0">
<p>
<?php echo TrustindexPlugin_google::___('While downloading the reviews, we noticed that your connected page is not found.<br />If it really exists, please contact us to resolve the issue or try connect it again.'); ?><br />
</p>
</div>
<?php elseif($is_review_download_in_progress): ?>
<div class="ti-notice notice-warning" style="margin: 0 0 15px 0">
<p>
<?php echo TrustindexPlugin_google::___('Your reviews are downloading in the background.'); ?>
<?php if(!in_array('google', [ 'facebook', 'google' ])): ?>
<?php echo TrustindexPlugin_google::___('This can take up to a few hours depending on the load and platform.'); ?>
<?php endif; ?>
<?php if(!count($reviews)): ?>
<br />
<?php echo TrustindexPlugin_google::___('In the meantime, you can setup your widget with a few example reviews.'); ?>
<?php endif; ?>
<?php if($trustindex_pm_google->is_review_manual_download()): ?>
<br />
<a href="#" id="review-manual-download" class="button button-primary ti-tooltip" style="margin-top: 10px" data-loading-text="<?php echo TrustindexPlugin_google::___("Loading") ;?>">
<?php echo TrustindexPlugin_google::___("Manual download") ;?>
<span class="ti-tooltip-message">
<?php echo TrustindexPlugin_google::___('Your reviews are downloading in the background.'); ?>
<?php if(!in_array('google', [ 'facebook', 'google' ])): ?>
<?php echo TrustindexPlugin_google::___('This can take up to a few hours depending on the load and platform.'); ?>
<?php endif; ?>
</span>
</a>
<?php endif; ?>
</p>
</div>
<?php endif; ?>
<?php if(!count($reviews)): ?>
<?php if(!$is_review_download_in_progress): ?>
<div class="ti-notice notice-warning" style="margin-left: 0">
<p><?php echo TrustindexPlugin_google::___("You had no reviews at the time of last review downloading."); ?></p>
</div>
<?php endif; ?>
<?php else: ?>
<table class="wp-list-table widefat fixed striped table-view-list ti-my-reviews ti-widget">
<thead>
<tr>
<th class="text-center"><?php echo TrustindexPlugin_google::___("Reviewer"); ?></th>
<th class="text-center" style="width: 90px;"><?php echo TrustindexPlugin_google::___("Rating"); ?></th>
<th class="text-center"><?php echo TrustindexPlugin_google::___("Date"); ?></th>
<th style="width: 48%"><?php echo TrustindexPlugin_google::___("Text"); ?></th>
<th></th>
</tr>
</thead>
<tbody>
<?php foreach ($reviews as $review): ?>
<tr data-id="<?php echo esc_attr($review->id); ?>">
<td class="text-center">
<img src="<?php echo esc_url($review->user_photo); ?>" class="ti-user-avatar" /><br />
<?php echo esc_html($review->user); ?>
</td>
<td class="text-center source-<?php echo ucfirst("google") ?>"><?php echo trustindex_plugin_write_rating_stars($review->rating); ?></td>
<td class="text-center"><?php echo esc_html($review->date); ?></td>
<td><div class="ti-review-content"><?php echo $trustindex_pm_google->getReviewHtml($review); ?></div></td>
<td>
<a href="<?php echo esc_attr($review->id); ?>" class="btn-text btn-highlight<?php if(isset($review->highlight) && $review->highlight): ?> has-highlight<?php endif; ?>" style="margin-left: 0"><?php echo TrustindexPlugin_google::___("Highlight text") ;?></a>
</td>
</tr>
<?php endforeach; ?>
</tbody>
</table>
<?php endif; ?>
</div>
<!-- Modal -->
<div class="ti-modal" id="ti-highlight-modal">
<?php wp_nonce_field( 'save-noreg_'.$trustindex_pm_google->get_plugin_slug(), '_wpnonce_highlight_save' ); ?>
<div class="ti-modal-dialog">
<div class="ti-modal-content">
<div class="ti-modal-header">
<span class="ti-modal-title"><?php echo TrustindexPlugin_google::___("Highlight text") ;?></span>
</div>
<div class="ti-modal-body">
<?php echo TrustindexPlugin_google::___("Just select the text you want to highlight") ;?>:
<div class="ti-highlight-content"></div>
</div>
<div class="ti-modal-footer">
<a href="#" class="btn-text btn-modal-close"><?php echo TrustindexPlugin_google::___("Back") ;?></a>
<a href="#" class="btn-text btn-primary btn-highlight-confirm" data-loading-text="<?php echo TrustindexPlugin_google::___("Loading") ;?>"><?php echo TrustindexPlugin_google::___("Save") ;?></a>
<a href="#" class="btn-text btn-danger btn-highlight-remove" style="position: absolute; left: 15px" data-loading-text="<?php echo TrustindexPlugin_google::___("Loading") ;?>"><?php echo TrustindexPlugin_google::___("Remove highlight") ;?></a>
</div>
</div>
</div>
</div>
<?php if(class_exists('Woocommerce')): ?>
<div class="ti-box">
<div class="ti-header"><?php echo TrustindexPlugin_google::___('Collect reviews automatically for your WooCommerce shop'); ?></div>
<?php if(!class_exists('TrustindexCollectorPlugin')): ?>
<p><?php echo TrustindexPlugin_google::___("Download our new <a href='%s' target='_blank'>%s</a> plugin and get features for free!", [ 'https://wordpress.org/plugins/customer-reviews-collector-for-woocommerce/', TrustindexPlugin_google::___('Customer Reviews Collector for WooCommerce') ]); ?></p>
<?php endif; ?>
<ul class="ti-check" style="margin-bottom: 20px">
<li><?php echo TrustindexPlugin_google::___('Send unlimited review invitations for free'); ?></li>
<li><?php echo TrustindexPlugin_google::___('E-mail templates are fully customizable'); ?></li>
<li><?php echo TrustindexPlugin_google::___('Collect reviews on 100+ review platforms (Google, Facebook, Yelp, etc.)'); ?></li>
</ul>
<?php if(class_exists('TrustindexCollectorPlugin')): ?>
<a href="?page=customer-reviews-collector-for-woocommerce%2Fadmin.php&tab=settings" class="btn-text">
<?php echo TrustindexPlugin_google::___("Collect reviews automatically"); ?>
</a>
<?php else: ?>
<a href="https://wordpress.org/plugins/customer-reviews-collector-for-woocommerce/" target="_blank" class="btn-text">
<?php echo TrustindexPlugin_google::___("Download plugin"); ?>
</a>
<?php endif; ?>
</div>
<?php endif; ?>
<?php endif; ?>