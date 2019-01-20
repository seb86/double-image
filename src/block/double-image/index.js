/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Edit from './components/edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n; // Allows for strings to be localized
const { createBlock } = wp.blocks;

/**
 * Block constants
 */
const name = 'double-image';

const title = __( 'Double Image' );

const icon = icons.doubleimage;

const keywords = [
	__( 'image' ),
	__( 'overlay' ),
	__( 'double' ),
];

/**
 * Block attributes. Attributes set for each piece of dynamic data used in the block.
 */
const blockAttributes = {
	// Image Layout
	format: {
		type: 'string',
		default: 'n-w',
	},

	// Block Alignment
	align: {
		type: 'string',
	},

	/**
	 * ID for the first image.
	 */
	firstImageID: {
		type: 'number',
	},
	/**
	 * URL for the first image.
	 */
	firstImageURL: {
		type: 'string',
	},
	/**
	 * Overlay background colour
	 */
	firstOverlayColor: {
		type: 'string',
	},
	/**
	 * Overlay text
	 */
	firstOverlayText: {
		type: 'array',
		source: 'children',
		selector: 'div.overlay-text.left',
		default: [],
	},
	/**
	 * Overlay text colour
	 */
	firstOverlayTextColor: {
		type: 'string',
	},
	/**
	 * Overlay text style
	 */
	firstOverlayTextStyle: {
		type: 'string',
	},
	/**
	 * Overlay text position
	 */
	firstOverlayTextPosition: {
		type: 'string',
		default: 'top',
	},
	/**
	 * Percentage opacity of overlay.
	 */
	firstOverlayRatio: {
		type: 'number',
		default: 30,
	},
	/**
	 * Is the first image fixed to enable parallax scrolling effect.
	 */
	hasFirstImageParallax: {
		type: 'boolean',
		default: false,
	},
	/**
	 * Do we show an overlay for the first image.
	 */
	showFirstOverlay: {
		type: 'boolean',
		default: true,
	},

	/**
	 * ID for the second image.
	 */
	secondImageID: {
		type: 'number',
	},
	/**
	 * URL for the second image.
	 */
	secondImageURL: {
		type: 'string',
	},
	/**
	 * Overlay background colour
	 */
	secondOverlayColor: {
		type: 'string',
	},
	/**
	 * Overlay text
	 */
	secondOverlayText: {
		type: 'array',
		source: 'children',
		selector: 'div.overlay-text.right',
		default: [],
	},
	/**
	 * Overlay text colour
	 */
	secondOverlayTextColor: {
		type: 'string',
	},
	/**
	 * Overlay text style
	 */
	secondOverlayTextStyle: {
		type: 'string',
	},
	/**
	 * Overlay text position
	 */
	secondOverlayTextPosition: {
		type: 'string',
		default: 'bottom',
	},
	/**
	 * Percentage opacity of overlay.
	 */
	secondOverlayRatio: {
		type: 'number',
		default: 30,
	},
	/**
	 * Is the second image fixed to enable parallax scrolling effect.
	 */
	hasSecondImageParallax: {
		type: 'boolean',
		default: false,
	},
	/**
	 * Do we show an overlay for the second image.
	 */
	showSecondOverlay: {
		type: 'boolean',
		default: false,
	},
};

const settings = {
	// The title of the block.
	title: title,

	// The description of the block.
	description: __( 'Insert two images side by side or stacked with optional overlay text.' ),

	// The keywords for the block in order to search for the block. Limit to 3 keywords / phrases only.
	keywords: keywords,

	// Necessary for saving block content.
	attributes: blockAttributes,

	// Enable or disable support for features in is block.
	supports: {
		align: [ 'wide', 'full', 'center' ],
	},

	// Transform this block to other image block types.
	transforms: {
		from: [
			/*{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( { attributes } ) => {
					return createBlock( `double-image/${ name }`, {
						attributes,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/image' ],
				transform: ( { attributes } ) => {
					return createBlock( `double-image/${ name }`, {
						attributes,
					} );
				},
			},*/
			{
				type: 'prefix',
				prefix: ':doubleimage',
				transform: function( attributes ) {
					return createBlock( `double-image/${ name }`, {
						attributes,
					} );
				},
			},
		],
		/*to: [
			{
				type: 'block',
				blocks: [ 'core/image' ],
				transform: ( { attributes } ) => {
					return createBlock( 'core/image', {
						attributes,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( { attributes } ) => {
					return createBlock( 'core/gallery', {
						attributes,
					} );
				},
			},
		],*/
	},

	// Determines what is displayed in the editor.
	edit: Edit,

	// Determines what is displayed on the frontend.
	save: function( props ) {
		const {
			className,
			format,
			showFirstOverlay,
			firstImageURL,
			firstOverlayColor,
			firstOverlayRatio,
			firstOverlayText,
			firstOverlayTextColor,
			firstOverlayTextStyle,
			firstOverlayTextPosition,
			hasFirstImageParallax,
			showSecondOverlay,
			secondImageURL,
			secondOverlayColor,
			secondOverlayRatio,
			secondOverlayText,
			secondOverlayTextColor,
			secondOverlayTextStyle,
			secondOverlayTextPosition,
			hasSecondImageParallax,
		} = props.attributes;

		if ( ! firstImageURL && ! secondImageURL ) {
			return null;
		}

		return (
			<div
				className={ classnames(
					className,
					format ? `format-${ format }` : 'format-n-w',
				) }
			>
				<div
					className={ 'image-block left' + parallax( hasFirstImageParallax ) + `${ showFirstOverlay ? ' show-overlay' : '' }` }
					style={ backgroundImage( firstImageURL ) }
				>
					{ ( showFirstOverlay ) && (
						<div className={ 'overlay-container' + dimRatioToClass( firstOverlayRatio ) + ' ' + textPosition( firstOverlayTextPosition ) }>
							{ ( firstOverlayText.length > 0 ) && (
								<div className={ 'overlay-text left' } style={ { color: firstOverlayTextColor, fontStyle: firstOverlayTextStyle } }>
									{ firstOverlayText }
								</div>
							) }
						</div>
					) }
				</div>

				<div
					className={ 'image-block right' + parallax( hasSecondImageParallax ) + `${ showSecondOverlay ? ' show-overlay' : '' }` }
					style={ backgroundImage( secondImageURL ) }
				>
					{ ( showSecondOverlay ) && (
						<div className={ 'overlay-container' + dimRatioToClass( secondOverlayRatio ) + ' ' + textPosition( secondOverlayTextPosition ) }>
							{ ( secondOverlayText.length > 0 ) && (
								<div className={ 'overlay-text right' } style={ { color: secondOverlayTextColor, fontStyle: secondOverlayTextStyle } }>
									{ secondOverlayText }
								</div>
							) }
						</div>
					) }
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };

/**
 * Sets the background image and returns with a style variable, if applicable.
 * 
 * @param {string} url Set the image url.
 * @return {string} The style variable.
 */
function backgroundImage( url ) {
	return url ? { backgroundImage: `url(${ url })` } : undefined;
}

/**
 * Convert the selected ratio to the correct background class.
 *
 * @param {number} ratio Selected opacity from 0 to 100.
 * @return {string} The class name, if applicable.
 */
function dimRatioToClass( ratio ) {
	return ratio ? ` has-background-dim-${ 10 * Math.round( ratio / 10 ) }` : '';
}

/**
 * Returns a class name if the background image is 
 * fixed to enable parallax scrolling effect.
 *
 * @param {string} isSelected 
 * @return {string} The class name, if applicable.
 */
function parallax( hasParallax ) {
	return hasParallax ? ' has-parallax' : '';
}

/**
 * Sets the postition of the overlay text.
 * 
 * @param {string} position
 */
function textPosition( position ) {
	return position ? 'text-' + `${ position }` : 'text-top';
}
