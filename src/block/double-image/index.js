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
import Inspector from './components/inspector';

/**
 * WordPress dependencies
 */
const {
	MediaPlaceholder,      // For placing a placeholder until an media image has been set.
	MediaUpload,           // For uploading media.
	BlockControls,         // For controlling the block
	BlockAlignmentToolbar, // For aligning the block.
	AlignmentToolbar,      // For aligning the text.
	RichText,              // For creating editable elements.
} = wp.editor;
const { registerBlockType } = wp.blocks; // Registers the block
const { __ } = wp.i18n; // Allows for strings to be localized

const validAlignments = [ 'left', 'center', 'right', 'wide', 'full' ];

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
	alignment: {
		type: 'string',
	},
	textAlign: {
		type: 'string',
    },

	// First Image
	firstImageURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	firstImageText: {
		type: 'string',
		source: 'children',
		selector: '.wp-block-double-image .image-block.left .overlay-container .overlay-text p'
	},
	firstImageTextColor: {
		type: 'string',
	},

	// Second Image
	secondImageURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	secondImageText: {
		type: 'string',
		source: 'children',
		selector: '.wp-block-double-image .image-block.right .overlay-container .overlay-text p'
	},
	secondImageTextColor: {
		type: 'string',
	},
};

/**
 * Block registration. The name of the block must be a string with prefix. Example: my-plugin/my-custom-block.
 */
registerBlockType( 'double-image/double-image', {

	// The title of the block.
	title: __( 'Double Image', '@@textdomain' ),

	// The description of the block.
	description: __( 'Add two images side by side with optional overlay text.', '@@textdomain' ),

	// Dashicon icon for the block.
	icon: 'image-flip-horizontal',

	// The category of the block.
	category: 'common',

	// The keywords for the block in order to search for the block. Limit to 3 keywords / phrases only.
	keywords: [
		__( 'image', '@@textdomain' ),
		__( 'column', '@@textdomain' ),
		__( 'double', '@@textdomain' ),
	],

	// Necessary for saving block content.
	attributes: blockAttributes,

	// Enable or disable support for features in is block.
	supports: {
		align: validAlignments,
        anchor: true,
    },
	
	/*transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ( { title } ) => (
					createBlock( 'core/heading', { content: title } )
				),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ( { content } ) => (
					createBlock( 'core/cover-image', { title: content } )
				),
			},
		],
	},*/

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},

	// Determines what is displayed in the editor.
	edit: Edit,

	// Determines what is displayed on the frontend.
	save: function( attributes, className ) {

		const {
			format,
			align,
			alignment,
			textAlign,
			firstImageURL,
			firstImageText,
			firstImageTextColor,
			secondImageURL,
			secondImageText,
			secondImageTextColor
		} = attributes;

		const styleFirstImage  = backgroundImageStyles( firstbackgroundImage );
		const styleSecondImage = backgroundImageStyles( secondbackgroundImage );

		const classes = classnames(
			className,
			'wp-blocks-double-image',
			format ? `format-${ format }` : '-1-4',
			align ? `align-${ align }` : null,
		);

		return (
			<div className={ classes }>
				{ firstImageText && firstImageText.length > 0 && (
					<div 
					className={ 'image-block left show-overlay' } 
					style={ styleFirstImage }
					>
						<div class="overlay-container top">
    						<div class="overlay-text left">
								<RichText.Content
									tagName="p"
									value={ firstImageText }
								/>
							</div>
  						</div>
					</div>
				 ) } : (
					<div 
						className={ 'image-block left' } 
						style={ styleFirstImage }
					></div>
				 ) }

				{ secondImageText && secondImageText.length > 0 && (
					<div 
					className={ 'image-block right show-overlay' } 
					style={ styleSecondImage }
					>
						<div class="overlay-container top">
    						<div class="overlay-text right">
								<RichText.Content
									tagName="p"
									value={ secondImageText }
								/>
							</div>
  						</div>
					</div>
				 ) } : (
					<div 
						className={ 'image-block right' } 
						style={ styleSecondImage }
					></div>
				 ) }

			</div>
		  );

		return null;
	},
} );

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}