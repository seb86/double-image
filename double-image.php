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
			self::$_instance->includes();
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
		$this->dir     = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->url     = untrailingslashit( plugins_url( '/', __FILE__ ) );

		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'init', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );
		//add_action( 'plugins_loaded', array( $this, 'load_dynamic_blocks' ) );
		add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'localization' ) );
	}

	/**
	 * Include required files.
	 *
	 * @access private
	 * @return void
	 */
	private function includes() {
		require_once( $this->dir . 'includes/class-block-category.php' );
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
	 * Register server-side code for individual blocks.
	 *
	 * @access public
	 */
	public function load_dynamic_blocks() {
		foreach ( glob( dirname( __FILE__ ) . '/src/block/*/index.php' ) as $block_logic ) {
			require $block_logic;
		}
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {
		// Styles.
		wp_register_style(
			self::$slug . '-frontend',
			$this->url . '/dist/blocks.style.build.css',
			array( 'wp-blocks' ),
			self::$version
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {
		// Styles.
		wp_register_style(
			self::$slug . '-editor',
			$this->url . '/dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			self::$version
		);

		// Scripts.
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
