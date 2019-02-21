<?php
/**
 * Load assets for the block.
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

class Double_Image_Block_Assets {

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * The Plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The Plugin slug.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->_version = DOUBLEIMAGE_VERSION;
		$this->_slug    = 'double-image';
		$this->_url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
	}

	/**
	 * Enqueue block asset for use to display the Gutenberg block.
	 *
	 * @access  public
	 * @since   1.0.0
	 * @version 1.2.0
	 */
	public function block_assets() {
		wp_enqueue_style(
			$this->_slug . '-style',
			$this->_url . '/dist/blocks.style.build.css',
			array( 'wp-editor' ),
			$this->_version
		);
	}

	/**
	 * Enqueue editor assets for use within Gutenberg editor.
	 *
	 * @access  public
	 * @since   1.0.0
	 * @version 1.2.0
	 * @uses    {wp-blocks} for block type registration & related functions.
	 * @uses    {wp-element} for WP Element abstraction — structure of blocks.
	 * @uses    {wp-i18n} to internationalize the block's text.
	 * @uses    {wp-editor} for WP editor styles.
	 */
	public function editor_assets() {
		// Style.
		wp_register_style(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			$this->_version
		);

		// Script.
		wp_enqueue_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			time(),
			true
		);
	}

}

new Double_Image_Block_Assets();
