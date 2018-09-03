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
	showOverlays: {
		type: 'boolean',
		default: true,
	},

	// First Image
	firstImageID: {
		type: 'number',
	},
	firstImageURL: {
		type: 'string',
	},
	firstImageText: {
		type: 'array',
		source: 'children',
		selector: '.overlay-text.left',
	},
	firstImageTextColor: {
		type: 'string',
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
	secondImageText: {
		type: 'array',
		source: 'children',
		selector: '.overlay-text.right',
	},
	secondImageTextColor: {
		type: 'string',
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
			format,
			align,
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
				className={ 'image-block left' + `${ showOverlay ? ' show-overlay' : '' }` }
				style={ backgroundImageStyles( firstImageURL ) }
				>
					{ ( firstShowOverlay && showOverlay ) && (
						<div 
							className={ 'overlay-container ' + `${ firstImageTextPosition }`}
							style={{ color: firstImageTextColor }}
						>
    						<div class="overlay-text left">
								<RichText.Content
									tagName="p"
									value={ firstImageText }
								/>
							</div>
  						</div>
					) }
				</div>

				<div 
				className={ 'image-block right' + `${ showOverlay ? ' show-overlay' : '' }` }
				style={ backgroundImageStyles( secondImageURL ) }
				>
					{ ( secondShowOverlay && showOverlay ) && (
						<div 
							className={ 'overlay-container ' + `${ secondImageTextPosition }` }
							style={{ color: secondImageTextColor }}
						>
    						<div class="overlay-text right">
								<RichText.Content
									tagName="p"
									value={ secondImageText }
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
