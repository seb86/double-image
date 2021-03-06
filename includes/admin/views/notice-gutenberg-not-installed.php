<?php
/**
 * Admin View: Check if Gutenberg is not installed notice.
 *
 * @package @@pkg.title
 * @author  @@pkg.author
 * @link    @@pkg.author_uri
 * @license @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $wp_version;
?>
<div class="notice notice-error">
    <p><?php echo sprintf( __( '%1$s requires the %2$sGutenberg%3$s editor. Either install and activate Gutenberg or upgrade WordPress to version 5.', '@@textdomain' ), esc_html( '@@pkg.title', '@@textdomain' ), '<strong>', '</strong>' ); ?></p>

    <p>
    <?php
    if ( ! is_plugin_active( 'gutenberg/gutenberg.php' ) && current_user_can( 'activate_plugin', 'gutenberg/gutenberg.php' ) ) :

        echo '<a href="' . esc_url( wp_nonce_url( self_admin_url( 'plugins.php?action=activate&plugin=gutenberg/gutenberg.php&plugin_status=active' ), 'activate-plugin_gutenberg/gutenberg.php' ) ) . '" class="button button-primary">' . esc_html__( 'Activate Gutenberg', '@@textdomain' ) . '</a>';

    else:

        if ( current_user_can( 'install_plugins' ) ) {
            $url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=gutenberg' ), 'install-plugin_gutenberg' );
        } else {
            $url = 'https://wordpress.org/plugins/gutenberg/';
        }

        $primary_button_used = false;
        $button_class = "";

        if ( version_compare( $wp_version, '5.0', '<' ) && current_user_can( 'upgrade_core' ) ) {
            echo '<a href="' . admin_url( 'update-core.php' ) . '" class="button button-primary">' . esc_html__( 'Upgrade WordPress', '@@textdomain' ) . '</a>';
            $primary_button_used = true;
        }

        if ( ! $primary_button_used ) $button_class = " button-primary";

        echo '<a href="' . esc_url( $url ) . '" class="button' . $button_class . '">' . esc_html__( 'Install Gutenberg', '@@textdomain' ) . '</a>';

    endif;
    ?>
    </p>

</div>