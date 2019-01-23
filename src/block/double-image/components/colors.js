/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const Colors = withColors(
	'color',
	{ firstOverlayColor: 'background-color' },
	{ firstOverlayTextColor: 'color' },
	{ secondOverlayTextColor: 'color' },
	{ secondOverlayColor: 'background-color' },
);

export default Colors;
