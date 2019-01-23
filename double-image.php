<?php
/**
 * Plugin Name: Double Image
 * Plugin URI: @@pkg.homepage
 * Description: @@pkg.description
 * Author: @@pkg.author
 * Author URI: @@pkg.author_uri
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
 * @link    @@pkg.author_uri
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
	 * @since 1.1.0
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
			_doing_it_wrong( __FUNCTION__, __( 'Cloning this object is forbidden.', '@@pkg.name' ), '@@pkg.version' );
		} // END __clone()

		/**
		 * Unserializing instances of this class is forbidden.
		 *
		 * @access public
		 * @return void
		 */
		public function __wakeup() {
			_doing_it_wrong( __FUNCTION__, __( 'Unserializing instances of this class is forbidden.', '@@pkg.name' ), '@@pkg.version' );
		} // END __wakeup()

		/**
		 * The Constructor.
		 * 
		 * @access  private
		 * @since   1.0.0
		 * @version 1.2.0
		 */
		private function __construct() {
			$this->constants();
			$this->includes();

			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ), 99 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_localization' ) );
		}

		/**
		 * Setup plugin constants.
		 *
		 * @access private
		 * @since  1.2.0
		 * @return void
		 */
		private function constants() {
			$this->define( 'DOUBLEIMAGE_VERSION', '@@pkg.version' );
			$this->define( 'DOUBLEIMAGE_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
			$this->define( 'DOUBLEIMAGE_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			$this->define( 'DOUBLEIMAGE_PLUGIN_FILE', __FILE__ );
			$this->define( 'DOUBLEIMAGE_PLUGIN_BASE', plugin_basename( __FILE__ ) );
			$this->define( 'DOUBLEIMAGE_REVIEW_URL', 'https://wordpress.org/support/plugin/double-image/reviews/' );
		}

		/**
		 * Define constant if not already set.
		 *
		 * @access private
		 * @since  1.2.0
		 * @param  string|string $name Name of the definition.
		 * @param  string|bool   $value Default value.
		 */
		private function define( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since  1.2.0
		 * @return void
		 */
		private function includes() {
			require_once( 'includes/class-block-assets.php' );
			require_once( 'includes/class-register-block.php' );

			if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
				require_once( 'includes/admin/class-admin-action-links.php' );
				require_once( 'includes/admin/class-admin-checks.php' );
				require_once( 'includes/admin/class-admin-feedback.php' );
				require_once( 'includes/admin/class-admin-install.php' );
			}
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.2.0
		 * @return  void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( '@@textdomain', false, dirname( plugin_basename( DOUBLEIMAGE_PLUGIN_DIR ) ) . '/languages/' );
		}

		/**
		 * Enqueue localization data for the block.
		 *
		 * @access  public
		 * @since   1.0.0
		 * @version 1.2.0
		 */
		public function block_localization() {
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'double-image-editor', '@@textdomain' );
			}
		}

	}

	return Double_Image::instance();

}