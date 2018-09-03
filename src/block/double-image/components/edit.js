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
const { RichText, MediaUpload, mediaUpload } = wp.editor;
const { Button, Dashicon, DropZone } = wp.components;

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
		this.offFocusImage    = this.offFocusImage.bind( this );

		this.state = {
			imageFocused: false,
		};
	}

	offFocusImage() {
		if ( this.state.imageFocused ) {
			this.setState( {
				imageFocused: false,
			} );
		}
	}

	onSelectImageOne( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { firstImageURL: media.url, firstImageID: media.id } );
		}
	}

	onSelectImageTwo( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { secondImageURL: media.url, secondImageID: media.id } );
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
			className,
			isSelected,
			mergeBlocks,
			onReplace,
			setAttributes,
			setState,
		} = this.props;

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

		const styleFirstImage  = backgroundImageStyles( firstImageURL );
		const styleSecondImage = backgroundImageStyles( secondImageURL );

		const firstTextPosition = textPosition( firstImageTextPosition );
		const secondTextPosition = textPosition( secondImageTextPosition );

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
					<div 
					className={ 'image-block left' + `${ showOverlays ? ' show-overlay' : '' }` + `${ firstImageURL ? ' has-image-set' : '' }`} 
					style={ styleFirstImage }
					>
						{ dropZoneOne }
						<MediaUpload
							onSelect={ onUploadImageOne }
							type="image"
							value={ firstImageID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
								{ ! firstImageID ? <Dashicon icon="format-image" /> : '' }
								</Button>
							) }
						>
						</MediaUpload>
						{ ! firstImageID ? '' :
							<div className={ 'overlay-container ' + `${firstTextPosition}`}>
								{ ( ( firstImageText && firstImageText.length > 0 ) || isSelected ) && (
									<div class="overlay-text left">
									<RichText
										multiline="p"
										tagName="p"
										placeholder={ __( 'Optional overlay text...' ) }
										value={ firstImageText }
										style={{ color: firstImageTextColor }}
										onMerge={ mergeBlocks }
										onChange={ ( value ) => setAttributes( { firstImageText: value } ) }
										unstableOnFocus={ this.offFocusImage }
										keepPlaceholderOnFocus
									/>
									</div>
								) }
							</div>
						}
					</div>
					<div 
					className={ 'image-block right' + `${ showOverlays ? ' show-overlay' : '' }` + `${ secondImageURL ? ' has-image-set' : '' }`} 
					style={ styleSecondImage }
					>
						{ dropZoneTwo }
						<MediaUpload
							onSelect={ onUploadImageTwo }
							type="image"
							value={ secondImageID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
								{ ! secondImageID ? <Dashicon icon="format-image" /> : '' }
								</Button>
							) }
						>
						</MediaUpload>
						{ ! secondImageID ? '' :
							<div className={ 'overlay-container ' + `${secondTextPosition}`}>
								{ ( ( secondImageText && secondImageText.length > 0 ) || isSelected ) && (
									<div class="overlay-text right">
									<RichText
										multiline="p"
										tagName="p"
										placeholder={ __( 'Optional overlay text...' ) }
										value={ secondImageText }
										style={{ color: secondImageTextColor }}
										onMerge={ mergeBlocks }
										onChange={ ( value ) => setAttributes( { secondImageText: value } ) }
										unstableOnFocus={ this.offFocusImage }
										keepPlaceholderOnFocus
									/>
									</div>
								) }
							</div>
						}
					</div>
				</DoubleImage>
			</Fragment>
		];
	}
} );

function backgroundImageStyles( url ) {
	return url ? { backgroundImage: `url(${ url })` } : undefined;
}

function textPosition( position ) {
	return position ? 'text-' + `${position}` : 'text-top';
}