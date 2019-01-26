<?php
/**
 * Run on plugin install.
 *
 * @since   1.2.0
 * @package Double Image
 * @author  Sébastien Dumont
 * @link    https://sebastiendumont.com
 * @license GPL-3.0
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
