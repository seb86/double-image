/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, MediaUpload, MediaUploadCheck, mediaUpload } = wp.editor;
const { Button, Dashicon, DropZone, Placeholder, Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Block edit function
 */
class Edit extends Component {
	constructor( props ) {
		super( ...arguments );

		this.addImageOne = this.addImageOne.bind( this );
		this.addImageTwo = this.addImageTwo.bind( this );
		this.onSelectImageOne = this.onSelectImageOne.bind( this );
		this.onSelectImageTwo = this.onSelectImageTwo.bind( this );
		this.offFocusImage = this.offFocusImage.bind( this );

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
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImageOne( media ),
		} );
	}

	addImageTwo( files ) {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImageTwo( media ),
		} );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			notices,
			setAttributes,
			setState,
		} = this.props;

		const {
			format,
			showFirstOverlay,
			firstImageID,
			firstImageURL,
			firstImageText,
			firstImageTextColor,
			hasFirstImageParallax,
			dimFirstImageRatio,
			firstImageTextPosition,
			showSecondOverlay,
			secondImageID,
			secondImageURL,
			secondImageText,
			secondImageTextColor,
			hasSecondImageParallax,
			dimSecondImageRatio,
			secondImageTextPosition,
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

		const uploadPlaceholder = (
			<Placeholder
				icon={ <Dashicon icon="format-image" /> }
				label={ __( 'Double Image' ) }
				instructions={ __( 'Drag an image, upload a new one or select a file from your library.' ) }
				className={ classnames( 'editor-media-placeholder', className ) }
				notices={ notices }
			/>
		);

		const uploading = (
			<div className={ 'uploading-image' }>
				{ __( 'Uploading image' ) }
				<Spinner />
			</div>
		);

		const onUploadImageOne = ( media ) => setAttributes( { firstImageURL: media.sizes.full.url, firstImageID: media.id } );
		const onUploadImageTwo = ( media ) => setAttributes( { secondImageURL: media.sizes.full.url, secondImageID: media.id } );

		const styleFirstImage = backgroundImageStyles( firstImageURL );
		const styleSecondImage = backgroundImageStyles( secondImageURL );

		const firstTextPosition = textPosition( firstImageTextPosition );
		const secondTextPosition = textPosition( secondImageTextPosition );

		return [
			// eslint-disable-next-line react/jsx-key
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
				<div
					className={ classnames(
						className,
						format ? `format-${ format }` : 'format-1-4',
					) }
				>
					<div
						className={ classnames(
							'image-block left',
							parallax( hasFirstImageParallax ),
							`${ showFirstOverlay ? ' show-overlay' : '' }`,
							`${ firstImageURL ? ' has-image-set' : '' }`,
							`${ isBlobURL( firstImageURL ) ? 'uploading' : '' }`
						) }
						style={ styleFirstImage }
					>
						<MediaUploadCheck>
							{ dropZoneOne }
							<MediaUpload
								onSelect={ onUploadImageOne }
								allowedTypes={ [ 'image' ] }
								value={ firstImageID }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ firstImageID ? '' : uploadPlaceholder }
									</Button>
								) }
							/>
						</MediaUploadCheck>

						{ isBlobURL( firstImageURL ) && uploading }

						{ ! firstImageID ? '' :
							<div className={ classnames(
								className,
								'overlay-container',
								dimRatioToClass( dimFirstImageRatio ),
								`${ firstTextPosition }`
							) }
							>
								<div className={ 'overlay-text right' + blockSelected( isSelected ) }>
									<RichText
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter optional overlay text...' ) }
										value={ firstImageText }
										className={ 'overlay-text-editor' }
										style={ { color: firstImageTextColor } }
										onChange={ ( value ) => setAttributes( { firstImageText: value } ) }
										unstableOnFocus={ this.offFocusImage }
										formattingControls={ [] }
										keepPlaceholderOnFocus
									/>
								</div>
							</div>
						}
					</div>
					<div
						className={ classnames(
							'image-block right',
							parallax( hasSecondImageParallax ),
							`${ showSecondOverlay ? ' show-overlay' : '' }`,
							`${ secondImageURL ? ' has-image-set' : '' }`,
							`${ isBlobURL( secondImageURL ) ? 'uploading' : '' }`
						) }
						style={ styleSecondImage }
					>
						<MediaUploadCheck>
							{ dropZoneTwo }
							<MediaUpload
								onSelect={ onUploadImageTwo }
								allowedTypes={ [ 'image' ] }
								value={ secondImageID }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ secondImageID ? '' : uploadPlaceholder }
									</Button>
								) }
							/>
						</MediaUploadCheck>

						{ isBlobURL( secondImageURL ) && uploading }

						{ ! secondImageID ? '' :
							<div className={ classnames(
								className,
								'overlay-container',
								dimRatioToClass( dimSecondImageRatio ),
								`${ secondTextPosition }`
							) }
							>
								<div className={ 'overlay-text right' + blockSelected( isSelected ) }>
									<RichText
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter optional overlay text...' ) }
										value={ secondImageText }
										className={ 'overlay-text-editor' }
										style={ { color: secondImageTextColor } }
										onChange={ ( value ) => setAttributes( { secondImageText: value } ) }
										unstableOnFocus={ this.offFocusImage }
										formattingControls={ [] }
										keepPlaceholderOnFocus
									/>
								</div>
							</div>
						}
					</div>
				</div>
			</Fragment>,
		];
	}
}

export default Edit;

function backgroundImageStyles( url ) {
	return url ? { backgroundImage: `url(${ url })` } : undefined;
}

function textPosition( position ) {
	return position ? 'text-' + `${ position }` : 'text-top';
}

function dimRatioToClass( dimRatio ) {
	return dimRatio ? ' has-background-dim-' + dimRatio : '';
}

function parallax( hasParallax ) {
	return hasParallax ? ' has-parallax' : '';
}

function blockSelected( isSelected ) {
	return isSelected ? ' selected' : '';
}
