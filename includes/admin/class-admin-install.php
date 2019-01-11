<?php
/**
 * Run on plugin install.
 *
 * @since   1.2.0
 * @package @@pkg.title
 * @author  @@pkg.author
 * @link    @@pkg.author_uri
 * @license @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Double_Image_Install Class
 */
class Double_Image_Install {

	/**
	 * Constructor
	 */
	public function __construct() {
		register_activation_hook( DOUBLEIMAGE_PLUGIN_FILE, array( $this, 'register_install_date' ) );
	}

	/*
	 * Register plugin defaults
	 */
	public function register_install_date() {
		if ( is_admin() ) {
			if ( ! get_option( 'doubleimage_date_installed' ) ) {
				add_option( 'doubleimage_date_installed', date( 'Y-m-d h:i:s' ) );
			}
		}
	}
}

return new Double_Image_Install();
