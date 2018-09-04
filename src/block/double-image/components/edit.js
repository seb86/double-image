/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import DoubleImage from './doubleimage';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, MediaUpload, mediaUpload } = wp.editor;
const { Button, Dashicon, DropZone } = wp.components;

/**
 * Block edit function
 */
export default class Edit extends Component {

	constructor() {
		super( ...arguments );

		this.offFocusImage    = this.offFocusImage.bind( this );
		this.onSelectImageOne = this.onSelectImageOne.bind( this );
		this.onSelectImageTwo = this.onSelectImageTwo.bind( this );
		this.addImageOne      = this.addImageOne.bind( this );
		this.addImageTwo      = this.addImageTwo.bind( this );

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
			isSelected,
			setAttributes,
			setState,
		} = this.props;

		const {
			showFirstOverlay,
			showSecondOverlay,
			firstImageID,
			firstImageURL,
			firstImageText,
			firstImageTextColor,
			hasFirstImageParallax,
			dimFirstImageRatio,
			firstImageTextPosition,
			secondImageID,
			secondImageURL,
			secondImageText,
			secondImageTextColor,
			hasSecondImageParallax,
			dimSecondImageRatio,
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
						className={ classnames(
							'image-block left', 
							hasParallax( hasFirstImageParallax ),
							`${ showFirstOverlay ? ' show-overlay' : '' }`,
							`${ firstImageURL ? ' has-image-set' : '' }`
						) }
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
							<div
								className={ classnames(
									'overlay-container',
									dimRatioToClass( dimFirstImageRatio ),
									`${firstTextPosition}`
								) }
							>
								<div className={ 'overlay-text left' + blockSelected( isSelected ) }>
									<RichText
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter optional overlay text...' ) }
										value={ firstImageText }
										className={ 'overlay-text-editor' }
										style={{ color: firstImageTextColor }}
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
							hasParallax( hasSecondImageParallax ),
							`${ showSecondOverlay ? ' show-overlay' : '' }`,
							`${ secondImageURL ? ' has-image-set' : '' }`
						) }
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
							<div
								className={ classnames(
									'overlay-container',
									dimRatioToClass( dimSecondImageRatio ),
									`${secondTextPosition}`
								) }
							>
								<div className={ 'overlay-text right' + blockSelected( isSelected ) }>
									<RichText
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter optional overlay text...' ) }
										value={ secondImageText }
										className={ 'overlay-text-editor' }
										style={{ color: secondImageTextColor }}
										onChange={ ( value ) => setAttributes( { secondImageText: value } ) }
										unstableOnFocus={ this.offFocusImage }
										formattingControls={ [] }
										keepPlaceholderOnFocus
									/>
								</div>
							</div>
						}
					</div>
				</DoubleImage>
			</Fragment>
		];
	}
}

function backgroundImageStyles( url ) {
	return url ? { backgroundImage: `url(${ url })` } : undefined;
}

function textPosition( position ) {
	return position ? 'text-' + `${ position }` : 'text-top';
}

function dimRatioToClass( dimRatio ) {
	return dimRatio ? ' has-background-dim-' + dimRatio : ''
}

function hasParallax( hasParallax ) {
	return hasParallax ? ' has-parallax': ''
}

function blockSelected( isSelected ) {
	return isSelected ? ' selected' : ''
}