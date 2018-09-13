<?php
/**
 * Load @@pkg.title custom block categories.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main @@pkg.title Block Category Class
 *
 * @since 1.0.0
 */
class Double_Image_Block_Category {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_filter( 'block_categories', array( $this, 'block_categories' ) );
	}

	/**
	 * Register our custom block category.
	 *
	 * @access public
	 * @param array $categories All categories.
	 * @link https://wordpress.org/gutenberg/handbook/extensibility/extending-blocks/#managing-block-categories
	 */
	public function block_categories( $categories ) {

		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'double_image',
					'title' => __( 'Double Image', '@@pkg.name' ),
				),
			)
		);
	}
}

return new Double_Image_Block_Category();
