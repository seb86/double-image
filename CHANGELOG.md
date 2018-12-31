# Double Image Changelog

## v1.1.0

* Compatible with Gutenberg 4.7+
* Compatible with WordPress 5+
* Added: Admin notice check to make sure the user has either WordPress 5 or if lower has Gutenberg installed.
* Added: Media upload check for current user permissions before allow to upload an image.
* Added: Help to each of the inspector settings.
* Added: Missing label for overlay text setting.
* Added: A spinner to indicate that the image is uploading when drop zone is used so the user know it is doing something.
* Added: White space where needed using `eslint`.
* Added: Prefix support so you can write the block using the prefix `:doubleimage `
* Added: An indication that you are hovering over the first or second slot when no image is set.
* Improved: Image can be previewed as it is uploaded when drop zone is used.
* Removed: A lot of white space for the script to compile better using `eslint`
* Removed: Block wrapper file and added the wrapper directly instead.
* Changed: The description of the block.
* Changed: The image layout option names.
* Changed: The block icon to a single image.
* Changed: The export of the block when registering it.
* Changed: Action hooks for the block for optimization.
* Corrected: File line ending to `LF` for the script to compile without issues.
* Corrected: Use of class with className.
* Improved: The drop zone placeholder with instructions.
* Improved: The main plugin file.
* Improved: Optimized the CSS for both the editor and front-end.

## v 1.0.0

* Initial Release