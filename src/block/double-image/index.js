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
	textAlign: {
		type: 'string',
		default: 'left',
	},
	showOverlays: {
		type: 'string',
		default: false,
	},

	// First Image
	firstImageID: {
		type: 'number',
	},
	firstImageURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	firstImageText: {
		type: 'string',
		source: 'children',
		selector: '.wp-block-double-image .image-block.left .overlay-container .overlay-text p',
		default: __( 'Enter your text here!' ),
	},
	firstImageTextColor: {
		type: 'string',
		default: '#fff',
	},
	firstImageTextPosition: {
		type: 'string',
		default: 'top',
	},

	// Second Image
	secondImageID: {
		type: 'number',
	},
	secondImageURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	secondImageText: {
		type: 'string',
		source: 'children',
		selector: '.wp-block-double-image .image-block.right .overlay-container .overlay-text p',
		default: __( 'Enter your text here!' ),
	},
	secondImageTextColor: {
		type: 'string',
		default: '#fff',
	},
	secondImageTextPosition: {
		type: 'string',
		default: 'bottom',
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
		align: validAlignments,
        anchor: true,
    },
	
	transforms: {
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
	},

	// Determines what is displayed in the editor.
	edit: Edit,

	/*edit( props ) {
		return (
			<div className={ className }>

				<div class="image-block left">
				</div>

				<div class="image-block right">
				</div>

			</div>
		)
	},*/

	// Determines what is displayed on the frontend.
	save: function( props ) {

		const {
			format,
			align,
			textAlign,
			showOverlays,
			firstImageID,
			firstImageURL,
			firstImageText,
			firstImageTextColor,
			firstImageTextPosition,
			secondImageID,
			secondImageURL,
			secondImageText,
			secondImageTextColor,
			secondImageTextPosition
		} = props.attributes;

		const styleFirstImage  = backgroundImageStyles( firstImageURL );
		const styleSecondImage = backgroundImageStyles( secondImageURL );

		const classes = classnames(
			className,
			format ? `format-${ format }` : 'format-1-4',
			align ? `align-${ align }` : null,
			firstImageTextPosition ? `text-${ firstImageTextPosition }` : 'text-top',
			secondImageTextPosition ? `text-${secondImageTextPosition }` : 'text-bottom',
		);

		const firstShowOverlay = firstImageText.length > 0 ? true : false;
		const secondShowOverlay = secondImageText.length > 0 ? true : false;

		return (
			<DoubleImage { ...props }>
				{ firstShowOverlay && showOverlays ? (
					<div 
					className={ 'image-block left show-overlay' } 
					style={ styleFirstImage }
					>
						<div 
							className={ 'overlay-container ' + {firstImageTextPosition}}
							style={{ color: firstImageTextColor }}
						>
    						<div class="overlay-text left">
								<RichText.Content
									tagName="p"
									value={ firstImageText }
								/>
							</div>
  						</div>
					</div>
				) : (
					<div 
						className={ 'image-block left' } 
						style={ styleFirstImage }
					></div>
				) }

				{ secondShowOverlay && showOverlays ? (
					<div 
					className={ 'image-block right show-overlay' } 
					style={ styleSecondImage }
					>
						<div 
							className={ 'overlay-container ' + {secondImageTextPosition}}
							style={{ color: secondImageTextColor }}
						>
    						<div class="overlay-text right">
								<RichText.Content
									tagName="p"
									value={ secondImageText }
								/>
							</div>
  						</div>
					</div>
				 ) : (
					<div 
						className={ 'image-block right' } 
						style={ styleSecondImage }
					></div>
				 ) }

			</DoubleImage>
		  );

		return null;
	},
} );

function backgroundImageStyles( url ) {
	return url ? {
		backgroundImage: `url(${ url })`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	} : undefined;
}