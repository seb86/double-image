# Double Image Changelog

## v1.2.0
* Compatible: Gutenberg 4.8
* New: Added install date and feedback prompt to ask users for a review of the plugin.
* New: Added readme.txt file for WordPress.org submission.
* Tweaked: The inspector settings to show only the panel per image once an image has been set.
* Tweaked: blocks.js to allow the icon to be passed via export of the block.
* Tweaked: blocks.js to apply a foreground colour to the icon.
* Tweaked: The README.md file.
* Tweaked: The structure of the plugin.
* Dev: Updated package.json file.
* Dev: Updated gulpfile.js file.

## v1.1.0

* Compatible: Gutenberg 4.7
* Compatible: WordPress 5+
* New: Overlay font style option per image.
* New: Prefix support so you can write the block using the prefix `:doubleimage`
* Added: Admin notice check to make sure the user has either WordPress 5 or if lower has Gutenberg installed.
* Added: Media upload check for current user permissions before allow to upload an image.
* Added: Help for each of the inspector settings.
* Added: Missing label for overlay text setting.
* Added: A spinner to indicate that the image is uploading when drop zone is used so the user know it is doing something.
* Removed: A lot of white space for the script to compile better using `eslint`
* Removed: Block wrapper file and added the wrapper directly instead.
* Changed: The image layout option names.
* Changed: The export of the block when registering it.
* Changed: Action hooks used for the block to register for optimization.
* Corrected: Files with incorrect line ending to `LF` for the script to compile without issues.
* Corrected: Use of class with className.
* Tweaked: The description of the block.
* Tweaked: The block icon to a single image.
* Tweaked: White space where needed using `eslint`.
* Tweaked: An indication that you are hovering over the first or second slot when no image is set.
* Tweaked: Image can be previewed as it is uploaded when drop zone is used.
* Tweaked: The drop zone placeholder with instructions.
* Tweaked: The main plugin file.
* Tweaked: Optimized the CSS for both the editor and front-end.
* Tweaked: The overlay settings only show if overlay is enabled.

## v1.0.0

* Initial Release