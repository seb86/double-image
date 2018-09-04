/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import DoubleImage from './components/doubleimage';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n; // Allows for strings to be localized
const { registerBlockType } = wp.blocks; // Registers the block
const { RichText } = wp.editor;

/**
 * Block attributes. Attributes set for each piece of dynamic data used in the block.
 */
const blockAttributes = {
	format: {
		type: 'string',
		default: '1-4',
	},
	align: {
		type: 'string',
	},

	// First Image
	firstImageID: {
		type: 'number',
	},
	firstImageURL: {
		type: 'string',
	},
	showFirstOverlay: {
		type: 'boolean',
		default: true,
	},
	firstImageText: {
		type: 'array',
		source: 'children',
		selector: 'div.overlay-text.left',
	},
	firstImageTextColor: {
		type: 'string',
	},
	hasFirstImageParallax: {
		type: 'boolean',
		default: false,
	},
	dimFirstImageRatio: {
		type: 'number',
		default: 30,
	},
	firstImageTextPosition: {
		type: 'string',
		default: 'top'
	},

	// Second Image
	secondImageID: {
		type: 'number',
	},
	secondImageURL: {
		type: 'string',
	},
	showSecondOverlay: {
		type: 'boolean',
		default: true,
	},
	secondImageText: {
		type: 'array',
		source: 'children',
		selector: 'div.overlay-text.right',
	},
	secondImageTextColor: {
		type: 'string',
	},
	hasSecondImageParallax: {
		type: 'boolean',
		default: false,
	},
	dimSecondImageRatio: {
		type: 'number',
		default: 30,
	},
	secondImageTextPosition: {
		type: 'string',
		default: 'bottom'
	},
};

/**
 * Block registration. The name of the block must be a string with prefix. Example: my-plugin/my-custom-block.
 */
registerBlockType( 'double-image/double-image', {

	// The title of the block.
	title: __( 'Double Image' ),

	// The description of the block.
	description: __( 'Add two images side by side with optional overlay text.' ),

	// Dashicon icon for the block.
	icon: 'image-flip-horizontal',

	// The category of the block.
	category: 'common',

	// The keywords for the block in order to search for the block. Limit to 3 keywords / phrases only.
	keywords: [
		__( 'image' ),
		__( 'column' ),
		__( 'double' ),
	],

	// Necessary for saving block content.
	attributes: blockAttributes,

	// Enable or disable support for features in is block.
	supports: {
		align: [ 'wide', 'full', 'center' ],
    },
	
	/*transforms: {
		from: [
			{
				type: 'raw',
				selector: 'div.wp-block-double-image-double-image',
				schema: {
					div: {
						classes: [ 'wp-block-double-image-double-image' ],
					},
				},
			},
		],
	},*/

	// Determines what is displayed in the editor.
	edit: Edit,

	// Determines what is displayed on the frontend.
	save: function( props ) {

		const {
			showFirstOverlay,
			showSecondOverlay,
			firstImageURL,
			firstImageText,
			firstImageTextColor,
			hasFirstImageParallax,
			dimFirstImageRatio,
			firstImageTextPosition,
			secondImageURL,
			secondImageText,
			secondImageTextColor,
			hasSecondImageParallax,
			dimSecondImageRatio,
			secondImageTextPosition
		} = props.attributes;

		const classes = classnames(
			firstImageTextPosition ? `text-${ firstImageTextPosition }` : 'text-top',
			secondImageTextPosition ? `text-${secondImageTextPosition }` : 'text-bottom',
		);

		const firstShowOverlay  = firstImageText.length > 0 ? true : false;
		const secondShowOverlay = secondImageText.length > 0 ? true : false;
		const showOverlay       = showOverlays.value ? showOverlays.value : showOverlays.default;

		return (
			<DoubleImage { ...props }>
				<div 
				className={ 'image-block left' + hasParallax( hasFirstImageParallax ) + `${ showFirstOverlay ? ' show-overlay' : '' }` }
				style={ backgroundImageStyles( firstImageURL ) }
				>
					{ ( firstImageText.length > 0 && showFirstOverlay ) && (
						<div className={ 'overlay-container' + dimRatioToClass( dimFirstImageRatio ) + ' ' + textPosition( firstImageTextPosition )}>
    						<div class="overlay-text left">
								<RichText.Content
									tagName="div"
									value={ firstImageText }
									style={{ color: firstImageTextColor }}
								/>
							</div>
  						</div>
					) }
				</div>

				<div 
				className={ 'image-block right' + hasParallax( hasSecondImageParallax ) + `${ showSecondOverlay ? ' show-overlay' : '' }` }
				style={ backgroundImageStyles( secondImageURL ) }
				>
					{ ( secondImageText.length > 0 && showSecondOverlay ) && (
						<div className={ 'overlay-container' + dimRatioToClass( dimSecondImageRatio ) + ' ' + textPosition( secondImageTextPosition ) }>
    						<div class="overlay-text right">
								<RichText.Content
									tagName="div"
									value={ secondImageText }
									style={{ color: secondImageTextColor }}
								/>
							</div>
  						</div>
					) }
					</div>
			</DoubleImage>
		  );

		return null;
	},
} );

function backgroundImageStyles( url ) {
	return url ? { backgroundImage: `url(${ url })` } : undefined;
}

function dimRatioToClass( dimRatio ) {
	return dimRatio ? ' has-background-dim-' + dimRatio : ''
}

function hasParallax( hasParallax ) {
	return hasParallax ? ' has-parallax': ''
}

function textPosition( position ) {
	return position ? 'text-' + `${ position }` : 'text-top';
}
