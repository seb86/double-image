/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Colors from './colors';
import Controls from './controls';
import DoubleImage from './doubleimage';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, MediaUpload, URLInput, mediaUpload } = wp.editor;
const { Dashicon, IconButton, DropZone } = wp.components;

/**
 * Block edit function
 */
export default compose( Colors ) ( class Edit extends Component {

	constructor() {
		super( ...arguments );

		this.addImageOne      = this.addImageOne.bind( this );
		this.addImageTwo      = this.addImageTwo.bind( this );
		this.onSelectImageOne = this.onSelectImageOne.bind( this );
		this.onSelectImageTwo = this.onSelectImageTwo.bind( this );

		this.state = {
			buttonFocused: false,
		};
	}

	onSelectImageOne( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { firstImageURL: media.sizes.full.url, firstImageID: media.id } );
		}
	}

	onSelectImageTwo( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { secondImageURL: media.sizes.full.url, secondImageID: media.id } );
		}
	}

	addImageOne( files ) {
		mediaUpload( {
			allowedType: 'image',
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImageOne( media ),
		} );
	}

	addImageTwo( files ) {
		mediaUpload( {
			allowedType: 'image',
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImageTwo( media ),
		} );
	}

	render() {

		const {
			attributes,
			setAttributes,
			className,
			isSelected,
			mergeBlocks,
			onReplace,
		} = this.props;

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
		} = attributes;

		const dropZoneOne = (
			<DropZone
				onFilesDrop={ this.addImageOne }
				label={ __( 'Add image' ) }
			/>
		);
		const dropZoneTwo = (
			<DropZone
				onFilesDrop={ this.addImageTwo }
				label={ __( 'Add image' ) }
			/>
		);

		const onUploadImageOne = ( media ) => setAttributes( { firstImageURL: media.sizes.full.url, firstImageID: media.id } );
		const onUploadImageTwo = ( media ) => setAttributes( { secondImageURL: media.sizes.full.url, secondImageID: media.id } );

		return [
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<DoubleImage { ...this.props }>
					{ dropZoneOne }
					<div class="image-block left">
						<MediaUpload
							onSelect={ onUploadImageOne }
							type="image"
							value={ firstImageID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! firstImageID ? <Dashicon icon="format-image" /> :
										<img
											className={ `${ className }__avatar-img` }
											src={ firstImageURL }
											alt="image"
										/>
									}
								</Button>
							) }
						>
						</MediaUpload>
					</div>
					{ dropZoneTwo }
					<div class="image-block right">
						<MediaUpload
							onSelect={ onUploadImageTwo }
							type="image"
							value={ secondImageID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! secondImageID ? <Dashicon icon="format-image" /> :
										<img
											className={ `${ className }__avatar-img` }
											src={ secondImageURL }
											alt="image"
										/>
									}
								</Button>
							) }
						>
						</MediaUpload>
					</div>
				</DoubleImage>
			</Fragment>
		];
	}
} );
