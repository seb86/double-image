/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, MediaUpload } = wp.editor;
const { Toolbar, IconButton } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			firstImageID,
			firstImageURL,
			secondImageID,
			secondImageURL,
		} = attributes;

		const onSelectImageOne = ( media ) => setAttributes( { firstImageURL: media.sizes.full.url, firstImageID: media.id } );
		const onSelectImageTwo = ( media ) => setAttributes( { secondImageURL: media.sizes.full.url, secondImageID: media.id } );

		return (
			<Fragment>
				<BlockControls>
					{ isSelected && firstImageURL &&
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImageOne }
								type="image"
								value={ firstImageID }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Edit first image' ) }
										icon="format-image"
										onClick={ open }
									/>
								) }
							/>
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Remove first image' ) }
								icon="trash"
								onClick={ () => setAttributes( { firstImageURL: '', firstImageID: '' } ) }
							/>
						</Toolbar>
					}
					{ isSelected && secondImageURL &&
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImageTwo }
								type="image"
								value={ secondImageID }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Edit second image' ) }
										icon="format-image"
										onClick={ open }
									/>
								) }
							/>
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Remove second image' ) }
								icon="trash"
								onClick={ () => setAttributes( { secondImageURL: '', secondImageID: '' } ) }
							/>
						</Toolbar>
					}
				</BlockControls>
			</Fragment>
		);
	}
}
