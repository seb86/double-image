/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const Colors = withColors(
	'color',
	{ firstImageTextColor: 'color' },
	{ secondImageTextColor: 'color' },
);

export default Colors;