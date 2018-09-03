/**
 * Internal dependencies
 */
import Colors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, PanelColor, PanelRow, ToggleControl, SelectControl } = wp.components;

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
			showOverlays,
			firstImageTextColor,
			secondImageTextColor
		} = attributes;

		return (
			<InspectorControls key="inspector">

				<SelectControl
					key={ 'format-selector' }
					label={ __( 'Format' ) }
					value={ format ? format : '1-4' }
					onChange={ ( value ) => setAttributes({ format: value }) }
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
					checked={ !! showOverlays }
					onChange={ () => setAttributes( { showOverlays: showOverlays } ) }
				/>

				<PanelBody title={ __( 'First Image Settings' ) } className="double-image__inspector-block-settings-panel-body">
					<PanelColor title={ __( 'First Text Color' ) } colorValue={ firstImageTextColor }>
						<ColorPalette
							label={ __( 'First Text Color' ) }
							value={ firstImageTextColor }
							onChange={ ( colorValue ) => setAttributes( { firstImageTextColor: colorValue } ) }
						/>
					</PanelColor>
				</PanelBody>

				<PanelBody title={ __( 'Second Image Settings' ) } className="double-image__inspector-block-settings-panel-body">
					<PanelColor title={ __( 'Second Text Color' ) } colorValue={ secondImageTextColor }>
						<ColorPalette
							label={ __( 'Second Text Color' ) }
							value={ secondImageTextColor }
							onChange={ ( colorValue ) => setAttributes( { secondImageTextColor: colorValue } ) }
						/>
					</PanelColor>
				</PanelBody>

			</InspectorControls>
		);
	}
} );
