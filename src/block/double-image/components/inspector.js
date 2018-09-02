/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, PanelColor, PanelRow, SelectControl } = wp.components;

/**
 * Inspector controls
 */
export default compose( Colors ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			format,
		} = attributes;

		return (
			<InspectorControls key="inspector">

				<SelectControl
					key={ 'format-selector' }
					label={ __( 'Format' ) }
					value={ props.attributes.format ? props.attributes.format : '1-4' }
					onChange={ props.setAttributes({ format: value }) }
					options={ [
						{
							label: __( '1-4' ),
							value: '1-4',
						},
						{
							label: __( '4-1' ),
							value: '4-1',
						},
						{
							label: __( 'Even' ),
							value: 'even',
						},
						{
							label: __( 'Full Stack' ),
							value: 'full-stack',
						}
					]}
				/>

				<ToggleControl
					label={ __( 'Show Overlays' ) }
					checked={ props.attributes.showOverlays }
					onChange={ ( value ) => setAttributes( { showOverlays: value } ) }
				/>

				<PanelBody
					title={ __( 'First Image Settings' ) } 
					className="double-image__inspector-block-settings-panel-body"
					initialOpen={ false }
				>

					<PanelColor 
						title={ __( 'First Text Color' ) } 
						colorValue={ firstImageTextColor } 
						initialOpen={ false }
					>
						<ColorPalette
							label={ __( 'First Text Color' ) }
							value={ firstImageTextColor }
							onChange={ ( value ) => setAttributes( { firstImageTextColor: value } ) }
						/>
					</PanelColor>

				</PanelBody>

				<PanelBody
					title={ __( 'Second Image Settings' ) } 
					className="double-image__inspector-block-settings-panel-body"
					initialOpen={ false }
				>

					<PanelColor 
						title={ __( 'Second Text Color' ) } 
						colorValue={ secondImageTextColor } 
						initialOpen={ false }
					>
						<ColorPalette
							label={ __( 'Second Text Color' ) }
							value={ secondImageTextColor }
							onChange={ ( value ) => setAttributes( { secondImageTextColor: value } ) }
						/>
					</PanelColor>

				</PanelBody>

			</InspectorControls>
		);
	}
} );
