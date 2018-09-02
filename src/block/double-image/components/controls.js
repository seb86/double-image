/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls, MediaUpload } = wp.editor;
const { Toolbar, IconButton } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			textAlign,
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
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( textAlign ) => setAttributes( { textAlign: textAlign } ) }
					/>
					{ firstImageURL &&
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImageOne }
								type="image"
								value={ firstImageID }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Edit image' ) }
										icon="edit"
										onClick={ open }
									/>
								) }
							/>
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Remove image' ) }
								icon="trash"
								onClick={ () => setAttributes( { firstImageURL: '', firstImageID: '' } ) }
							/>
						</Toolbar>
					}
					{ secondImageURL &&
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImageTwo }
								type="image"
								value={ secondImageID }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Edit image' ) }
										icon="edit"
										onClick={ open }
									/>
								) }
							/>
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Remove image' ) }
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
