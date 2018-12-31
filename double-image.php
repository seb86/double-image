<?php
/**
 * Plugin Name: Double Image
 * Plugin URI: @@pkg.repository_uri
 * Description: @@pkg.description
 * Author: @@pkg.author
 * Author URI: @@pkg.author_uri
 * Tags: gutenberg, editor, block, layout, image
 * Version: @@pkg.version
 * Text Domain: @@pkg.name
 * Domain Path: languages
 * Requires at least: @@pkg.requires
 * Tested up to: @@pkg.tested_up_to
 *
 * @@pkg.title is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 * 
 * @@pkg.title is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with @@pkg.title. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package @@pkg.title
 * @author  @@pkg.author
 * @license @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Double_Image' ) ) {
	/**
	 * Main @@pkg.title Class
	 *
	 * @since 1.0.0
	 */
	final class Double_Image {

		/**
		 * This plugin's instance.
		 *
		 * @access private
		 * @static
		 * @var Double_Image
		 */
		private static $_instance = null;

		/**
		 * The base directory path (without trailing slash).
		 *
		 * @access private
		 * @var string $url
		 */
		private $dir;

		/**
		 * The base URL path (without trailing slash).
		 *
		 * @access private
		 * @var string $url
		 */
		private $url;

		/**
		 * The Plugin version.
		 *
		 * @access private
		 * @var string $version
		 */
		private $version;

		/**
		 * The Plugin slug.
		 *
		 * @access private
		 * @var string $slug
		 */
		private $slug;

		/**
		 * Registers the plugin.
		 * 
		 * @access public
		 * @static
		 */
		public static function instance() {
			if ( null === self::$_instance ) {
				self::$_instance = new self();
			}
		} // END instance()

		/**
		 * Cloning is forbidden.
		 *
		 * @access public
		 * @return void
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden
			_doing_it_wrong( __FUNCTION__, __( 'Cloning this object is forbidden.', '@@pkg.name' ), self::$version );
		} // END __clone()

		/**
		 * Unserializing instances of this class is forbidden.
		 *
		 * @access public
		 * @return void
		 */
		public function __wakeup() {
			_doing_it_wrong( __FUNCTION__, __( 'Unserializing instances of this class is forbidden.', '@@pkg.name' ), self::$version );
		} // END __wakeup()

		/**
		 * The Constructor.
		 * 
		 * @access  private
		 * @since   1.0.0
		 * @version 1.1.0
		 */
		private function __construct() {
			$this->version = '@@pkg.version';
			$this->slug    = 'double-image';
			$this->dir     = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
			$this->url     = untrailingslashit( plugins_url( '/', __FILE__ ) );

			// Register block.
			add_action( 'init', array( $this, 'register_block' ), 99 );

			// Check if Gutenberg is installed or have WordPress version 5.
			add_action( 'plugins_loaded', array( $this, 'check_wp_version' ) );

			// Load textdomain.
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
		} // END __construct()

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

			// Gutenberg is active.
			self::gutenberg_active();
		} // END check_wp_version()

		/**
		 * Gutenberg is Not Installed Notice.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.1.0
		 * @global  $wp_version string
		 * @return  void
		 */
		public function gutenberg_not_installed() {
			global $wp_version;

			echo '<div class="notice notice-error">';

				echo '<p>' . sprintf( __( '%1$s requires the %2$sGutenberg%3$s editor. Either install and activate Gutenberg or upgrade WordPress to version 5.', '@@textdomain' ), esc_html( '@@pkg.title', '@@textdomain' ), '<strong>', '</strong>' ) . '</p>';

				echo '<p>';

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

				echo '</p>';

			echo '</div>';
		} // END gutenberg_not_installed()

		/**
		 * Run these actions once Gutenberg is installed and active.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.1.0
		 * @return  void
		 */
		public function gutenberg_active() {
			add_action( 'init', array( $this, 'block_assets' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'localization' ) );
		} // END gutenberg_active()

		/**
		 * Registers the block.
		 *
		 * @access public
		 * @since  1.0.0
		 */
		public function register_block() {
			// Return early if this function does not exist.
			if ( ! function_exists( 'register_block_type' ) ) {
				return;
			}

			// Shortcut for the slug.
			$slug = $this->slug;

			register_block_type(
				$slug . '/' . $slug, array(
					'editor_script' => $slug . '-editor',
					'editor_style'  => $slug . '-editor',
					'style'         => $slug . '-' . $slug,
				)
			);
		} // END register_block()

		/**
		 * Enqueue block assets for use to display Gutenberg block 
		 * but only if the post content contains the block.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.1.0
		 */
		public function block_assets() {
			wp_register_style(
				$this->slug . '-' . $this->slug,
				$this->url . '/dist/blocks.style.build.css',
				array( 'wp-editor' ),
				$this->version
			);
		} // END block_assets()

		/**
		 * Enqueue editor assets for use within Gutenberg editor.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.1.0
		 * @uses    {wp-blocks} for block type registration & related functions.
		 * @uses    {wp-element} for WP Element abstraction — structure of blocks.
		 * @uses    {wp-i18n} to internationalize the block's text.
		 * @uses    {wp-editor} for WP editor styles.
		 */
		public function editor_assets() {
			// Style.
			wp_register_style(
				$this->slug . '-editor',
				$this->url . '/dist/blocks.editor.build.css',
				array( 'wp-edit-blocks' ),
				$this->version
			);

			// Script.
			wp_register_script(
				$this->slug . '-editor',
				$this->url . '/dist/blocks.build.js',
				array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
				$this->version,
				true
			);
		} // END editor_assets()

		/**
		 * Enqueue Jed-formatted localization data.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.1.0
		 */
		public function localization() {
			// Check if this function exists.
			if ( ! function_exists( 'gutenberg_get_jed_locale_data' ) ) {
				return;
			}

			$locale  = gutenberg_get_jed_locale_data( $this->slug );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ' );';

			wp_script_add_data( $this->slug . '-editor', 'data', $content );

			/*if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( $this->slug . '-editor', '@@textdomain' );
			}*/
		} // END localization()

		/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since  1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( '@@textdomain', false, dirname( plugin_basename( $this->dir ) ) . '/languages/' );
		} // END load_textdomain()

	} // END class Double_Image()

	return Double_Image::instance();

} // END if class exists