<?php
require_once plugin_dir_path( __FILE__ ) . 'trustindex-plugin.class.php';
$trustindex_pm_google = new TrustindexPlugin_google("google", __FILE__, "9.8.5.1", "Widgets for Google Reviews", "Google");
$trustindex_pm_google->uninstall();
?>