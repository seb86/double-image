<?php
/**
 * Checks if the WordPress setup is ready for @@pkg.title.
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

class Double_Image_Check {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'check_wp_version' ) );
	}

	/**
	 * Check we're running the required version of WordPress or Gutenberg is installed.
	 *
	 * @access public
	 * @since  1.1.0
	 * @global $wp_version string
	 * @return bool|void
	 */
	public function check_wp_version() {
		global $wp_version;

		if ( ! defined( 'GUTENBERG_VERSION' ) && version_compare( $wp_version, '5.0', '<' ) ) {
			add_action( 'admin_notices', array( $this, 'gutenberg_not_installed' ) );
			return false;
		}
	}

	/**
	 * Gutenberg is Not Installed Notice.
	 *
	 * @access  public
	 * @since   1.0.0
	 * @version 1.2.0
	 * @global  $wp_version string
	 * @return  void
	 */
	public function gutenberg_not_installed() {
		include_once( 'views/notice-gutenberg-not-installed.php' );
	}

}

new Double_Image_Check();