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

/**
 * Main @@pkg.title Class
 */
class Double_Image {

	/**
	 * This plugin's instance.
	 *
	 * @access private
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
	private static $version = '@@pkg.version';

	/**
	 * The Plugin version.
	 *
	 * @access private
	 * @var string $slug
	 */
	private static $slug = 'double-image';

	/**
	 * Registers the plugin.
	 * 
	 * @access public
	 */
	public static function instance() {
		if ( null === self::$_instance ) {
			self::$_instance = new self();
		}
	}

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
	 * @access private
	 */
	private function __construct() {
		$this->dir = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->url = untrailingslashit( plugins_url( '/', __FILE__ ) );

		// Register block and assets.
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'init', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );

		// Check if Gutenberg is installed and load text domain.
		add_action( 'plugins_loaded', array( $this, 'check_gutenberg_installed' ) );
		add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
	} // END __construct()

	/**
	 * Checks if Gutenberg is installed before running filters for the WordPress updater.
	 *
	 * @access public
	 * @return bool|void
	 */
	public function check_gutenberg_installed() {
		if ( ! defined( 'GUTENBERG_VERSION' ) ) {
			add_action( 'admin_notices', array( $this, 'gutenberg_not_installed' ) );
			return false;
		}

		// Gutenberg is active.
		self::gutenberg_active();
	} // END check_gutenberg_installed()

	/**
	 * Gutenberg is Not Installed Notice.
	 *
	 * @access public
	 * @return void
	 */
	public function gutenberg_not_installed() {
		echo '<div class="notice notice-error">';

			echo '<p>' . sprintf( __( '%1$s requires %2$sGutenberg%3$s to be installed and activated.', '@@textdomain' ), esc_html( '@@pkg.title', '@@textdomain' ), '<strong>', '</strong>' ) . '</p>';

			echo '<p>';

			if ( ! is_plugin_active( 'gutenberg/gutenberg.php' ) && current_user_can( 'activate_plugin', 'gutenberg/gutenberg.php' ) ) :

				echo '<a href="' . esc_url( wp_nonce_url( self_admin_url( 'plugins.php?action=activate&plugin=gutenberg/gutenberg.php&plugin_status=active' ), 'activate-plugin_gutenberg/gutenberg.php' ) ) . '" class="button button-primary">' . esc_html__( 'Activate Gutenberg', '@@textdomain' ) . '</a>';

			else:

				if ( current_user_can( 'install_plugins' ) ) {
					$url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=gutenberg' ), 'install-plugin_gutenberg' );
				} else {
					$url = 'https://wordpress.org/plugins/gutenberg/';
				}

				echo '<a href="' . esc_url( $url ) . '" class="button button-primary">' . esc_html__( 'Install Gutenberg', '@@textdomain' ) . '</a>';

			endif;

			echo '</p>';

		echo '</div>';

		echo '<div class="error"><p>' . sprintf( __( '@@pkg.title requires %s to be installed and activated.', 'gutenberg-prototype' ), '<a href="https://wordpress.org/plugins/gutenberg/" target="_blank">Gutenberg</a>' ) . '</p></div>';
	} // END gutenberg_not_installed()

	/**
	 * Run these actions once Gutenberg is installed and active.
	 *
	 * @access public
	 * @return void
	 */
	public function gutenberg_active() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'localization' ) );
	} // END gutenberg_active()

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

		// Shortcut for the slug.
		$slug = self::$slug;

		register_block_type(
			$slug . '/' . $slug, array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
	}

	/**
	 * Enqueue block assets for use to display Gutenberg block.
	 *
	 * @access public
	 */
	public function block_assets() {
		wp_register_style(
			self::$slug . '-frontend',
			$this->url . '/dist/blocks.style.build.css',
			array( 'wp-blocks' ),
			self::$version
		);
	}

	/**
	 * Enqueue editor assets for use within Gutenberg editor.
	 *
	 * @access public
	 */
	public function editor_assets() {
		// Style.
		wp_register_style(
			self::$slug . '-editor',
			$this->url . '/dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			self::$version
		);

		// Script.
		wp_register_script(
			self::$slug . '-editor',
			$this->url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
			self::$version
		);
	}

	/**
	 * Enqueue Jed-formatted localization data.
	 *
	 * @access public
	 */
	public function localization() {
		// Check if this function exists.
		if ( ! function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			return;
		}

		$locale  = gutenberg_get_jed_locale_data( self::$slug );
		$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ' );';

		wp_script_add_data( self::$slug . '-editor', 'data', $content );
	}

	/**
	 * Loads the plugin language files.
	 *
	 * @access public
	 * @return void
	 */
	public function load_textdomain() {
		load_plugin_textdomain( '@@textdomain', false, dirname( plugin_basename( $this->dir ) ) . '/languages/' );
	}

} // END class Double_Image()

return Double_Image::instance();
