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
			firstOverlayColor,
			firstOverlayRatio,
			firstOverlayText,
			firstOverlayTextColor,
			firstOverlayTextPosition,
			firstOverlayTextStyle,
			hasFirstImageParallax,
			showSecondOverlay,
			secondImageID,
			secondImageURL,
			secondOverlayColor,
			secondOverlayRatio,
			secondOverlayText,
			secondOverlayTextColor,
			secondOverlayTextPosition,
			secondOverlayTextStyle,
			hasSecondImageParallax,
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

		const setFirstBackgroundColor = backgroundColor( firstOverlayColor );
		const setSecondBackgroundColor = backgroundColor( secondOverlayColor );
		const setFirstImage = backgroundImage( firstImageURL );
		const setSecondImage = backgroundImage( secondImageURL );
		const firstTextPosition = textPosition( firstOverlayTextPosition );
		const secondTextPosition = textPosition( secondOverlayTextPosition );

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
				<div
					className={ classnames(
						className,
						format ? `format-${ format }` : 'format-n-w',
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
						style={ setFirstImage }
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
								dimRatioToClass( firstOverlayRatio ),
								`${ firstTextPosition }`
							) }
							>
								<div className={ 'overlay-text left' + blockSelected( isSelected ) }>
									<RichText
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter optional overlay text...' ) }
										value={ firstOverlayText }
										className={ 'overlay-text-editor' }
										style={ { color: firstOverlayTextColor, fontStyle: firstOverlayTextStyle } }
										onChange={ ( value ) => setAttributes( { firstOverlayText: value } ) }
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
						style={ setSecondImage }
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
								dimRatioToClass( secondOverlayRatio ),
								`${ secondTextPosition }`
							) }
							>
								<div className={ 'overlay-text right' + blockSelected( isSelected ) }>
									<RichText
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter optional overlay text...' ) }
										value={ secondOverlayText }
										className={ 'overlay-text-editor' }
										style={ { color: secondOverlayTextColor, fontStyle: secondOverlayTextStyle } }
										onChange={ ( value ) => setAttributes( { secondOverlayText: value } ) }
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

/**
 * Sets the background colour for the overlay and returns with a style variable, if applicable.
 * 
 * @param {string} color Set the background color.
 * @return {string} The style variable.
 */
function backgroundColor( color ) {
	return color ? { backgroundColor: `${ color }` } : undefined;
}

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
 * Sets the postition of the overlay text.
 * 
 * @param {string} position
 */
function textPosition( position ) {
	return position ? 'text-' + `${ position }` : 'text-top';
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
 * Returns a class name if the block was selected.
 *
 * @param {string} isSelected 
 * @return {string} The class name, if applicable.
 */
function blockSelected( isSelected ) {
	return isSelected ? ' selected' : '';
}
