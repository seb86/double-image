<?php
/**
 * Register and load the block.
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

class Double_Image_Register_Blocks {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_block' ), 99 );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_block() {
		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Block slug.
		$slug = 'double-image';

		register_block_type(
			$slug . '/' . $slug, array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-style',
			)
		);
	}
}

new Double_Image_Register_Blocks();
