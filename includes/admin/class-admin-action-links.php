<?php
/**
 * Add links to @@pkg.title on the plugins admin page.
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

class Double_Image_Action_Links {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 2 );
	}

	/**
	 * Plugin row meta links
	 *
	 * @access public
	 * @param  array  $plugin_meta An array of the plugin's metadata.
	 * @param  string $plugin_file Path to the plugin file.
	 * @return array  $input
	 */
	public function plugin_row_meta( $plugin_meta, $plugin_file ) {
		// Check if this is defined.
		if ( ! defined( 'DOUBLEIMAGE_PLUGIN_BASE' ) ) {
			define( 'DOUBLEIMAGE_PLUGIN_BASE', null );
		}

		if ( DOUBLEIMAGE_PLUGIN_BASE === $plugin_file ) {
			$row_meta = [
				'review' => '<a href="' . esc_url( DOUBLEIMAGE_REVIEW_URL ) . '" aria-label="' . esc_attr( __( 'Review @@pkg.title on WordPress.org', '@@textdomain' ) ) . '" target="_blank">' . __( 'Leave a Review', '@@textdomain' ) . '</a>',
			];

			$plugin_meta = array_merge( $plugin_meta, $row_meta );
		}

		return $plugin_meta;
	}
}

new Double_Image_Action_Links();
