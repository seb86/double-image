# Double Image for Gutenberg

[![WP Plugin Page](https://img.shields.io/badge/WordPress-%E2%86%92-lightgrey.svg?style=flat-square)](https://wordpress.org/plugins/double-image/)
[![License](https://img.shields.io/badge/license-GPL--3.0%2B-red.svg)](https://github.com/seb86/double-image/blob/master/license.txt)
[![WordPress plugin](https://img.shields.io/wordpress/plugin/v/double-image.svg?style=flat)](https://wordpress.org/plugins/double-image/)
[![WordPress](https://img.shields.io/wordpress/v/double-image.svg?style=flat)]()
[![GitHub forks](https://img.shields.io/github/forks/seb86/double-image.svg?style=flat)](https://github.com/seb86/double-image/network)
[![WordPress.org downloads](https://img.shields.io/wordpress/plugin/dt/double-image.svg)](https://wordpress.org/plugins/double-image/)

**Contributors:** sebd86  
**Tags:** blocks, gutenberg, editor, page builder, gutenberg blocks  
**Requires at least:** 4.9  
**Tested up to:** 5.0.3  
**Requires PHP:** 5.6+  
**Stable tag:** 1.2.0  
**License:** GPL v2 or later  

A custom block designed to insert two images side by side or stacked with optional overlay text.

## 🔔 Overview

Double Image is designed for the Gutenberg editor. This custom block design allows you to display two images side by side or stacked.

Images can be either selected via the media library or simply drag and drop an image to either drop zones.

Apply an overlay with or without a background color and adjust the opacity of the background.

Text can be added on either image at the top or bottom.

## 💻 Screenshots

![Double Image Block](https://raw.githubusercontent.com/seb86/double-image/master/.wordpress-org/assets/screenshot-1.png)

![Two images set](https://raw.githubusercontent.com/seb86/double-image/master/.wordpress-org/assets/screenshot-2.png)

![Both images with overlay colour and overlay text](https://raw.githubusercontent.com/seb86/double-image/master/.wordpress-org/assets/screenshot-3.png)

![Inspector showing the settings for the first image](https://raw.githubusercontent.com/seb86/double-image/master/.wordpress-org/assets/screenshot-4.png)


## How to Use

Any 3 of these keywords will narrow down the blocks when looking for Double Image to add.

* image
* overlay
* double

You can also add the block by typing `:doubleimage` and then press the spacebar.

Both placeholders are drop zones so if you don't have the images already in your media library you can drag and drop an image. When the image is dropped you will see the image in the background and indicator showing it is currently uploading. When it is finished uploading the indicator will disappear.

To select an image from the media library, simply select the first or second placeholder to set an image.

Once an image is set you can then play around with the block settings.


### Block Settings

When the block is selected you have the option to change the following:

#### Image Layouts
1. `Narrow | Wide`
2. `Wide | Narror`
3. `Even`
4. `Stacked`

The first two are ratio layouts. 38% : 60% and vise versa. `Even` provides the same size images with no spacing in between. `Stacked` sets each image full width on top of one another.

Each image has the same options.
* Fixed Background (Enable to have a parallax scrolling effect.)
* Show Overlay (Enable to add a text overlay.)

The remaining block options do not show unless "Show Overlay" is enabled for either image.

* Background Color
* Background Opacity
* Text Color.
* Text Position.


#### Toolbar
The toolbar provides buttons for each image to change or remove the image. You can also set the alignment to `Wide Width`, `Full width` or `Center`.


#### Default Block Settings
* The default image layout is `Narrow | Wide`.
* For the first image, the overlay is enabled and the text overlay position is set to the top.
* For the second image, the overlay is not enabled. When the overlay is enabled, the text overlay position is set to the bottom.


### Is This Free?

Yes, it's free. But here's what you should _really_ care about:

* The code adheres to the [WordPress Coding Standards](https://codex.wordpress.org/WordPress_Coding_Standards) and follows best practices and conventions.
* This is my first Gutenberg block.


#### Requirements ✅

To use this plugin you will need:

* PHP v5.6+ (Recommend PHP v7.0+)
* WordPress v4.9 and [Gutenberg](https://wordpress.org/plugins/gutenberg/) or
* WordPress v5.0+


#### Installation 💽

1. If you are not running WordPress 5.0+, install [Gutenberg](https://wordpress.org/plugins/gutenberg/) plugin.
2. [Download the latest release of Double Image](https://github.com/seb86/double-image/releases) from the GitHub repository, or..
3. Go to **WordPress Admin > Plugins > Add New**.
4. Click **Upload Plugin** at the top.
5. **Choose File** and select the `.zip` file you downloaded in **Step 1**.
6. Click **Install Now** and **Activate** the plugin.


#### Reporting Issues 📝

If you think you have found a bug in the plugin or want to see a new feature added, please [open a new issue](https://github.com/seb86/double-image/issues/new) and I will do my best to help you out.


## Support
Need help? This is a developer's portal for Double Image and should not be used for general support and queries. Please reach visit the [Double Image support forum on WordPress.org](https://wordpress.org/support/plugin/double-image/).


## Contribute

If you or your company use Double Image or appreciate the work I’m doing in open source, please consider supporting me directly so I can continue maintaining it and keep evolving the project. It's pretty clear that software actually costs something, and even though it may be offered freely, somebody is paying the cost.

You'll be helping to ensure I can spend the time not just fixing bugs, adding features, releasing new versions, but also keeping the project afloat. Any contribution you make is a big help and is greatly appreciated.

Please also consider starring ✨ and sharing 👍 the repo! This helps the project getting known and grow with the community. 🙏

If you want to do a one-time donation, you can donate to:
- [My PayPal](https://www.paypal.me/codebreaker)
- [BuyMeACoffee.com](https://www.buymeacoffee.com/sebastien)

Thank you for your support! 🙌


## Development 💻

1. Clone the GitHub repository: `https://github.com/seb86/double-image.git`
2. Browse to the folder in the command line.
3. Run the `npm install` command to install the plugin's dependencies within a /node_modules/ folder.
4. Run the `npm start` command for development.
5. Run the `build` gulp task to process build files and generate a zip.


---


##### License

Double Image is released under [GNU General Public License v3.0](http://www.gnu.org/licenses/gpl-3.0.html).


##### Credits

Double Image is developed and maintained by [Sébastien Dumont](https://sebastiendumont.com/about/).

---

<p align="center">
	<img src="https://raw.githubusercontent.com/seb86/my-open-source-readme-template/master/a-sebastien-dumont-production.png" width="353">
</p>
