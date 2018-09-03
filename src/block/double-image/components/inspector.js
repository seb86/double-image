/**
 * Internal dependencies
 */
import Colors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, PanelColor, Toolbar, ToggleControl, SelectControl } = wp.components;

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
			firstImageTextPosition,
			secondImageTextColor,
			secondImageTextPosition
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings' ) } className="double-image__inspector-block-settings-panel-body">
						<SelectControl
							key={ 'format-selector' }
							label={ __( 'Image Layout' ) }
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

						<SelectControl
							key={ 'overlay-text-postition-selector' }
							label={ __( 'First Image Overlay Text Position' ) }
							value={ firstImageTextPosition ? firstImageTextPosition : 'text-top' }
							onChange={ ( value ) => setAttributes({ firstImageTextPosition: value }) }
							options={ [
								{
									label: __( 'Top' ),
									value: 'top',
								},
								{
									label: __( 'Bottom' ),
									value: 'bottom',
								},
							] }
							default={ 'top' }
						/>

						<SelectControl
							key={ 'overlay-text-postition-selector' }
							label={ __( 'Second Image Overlay Text Position' ) }
							value={ secondImageTextPosition ? secondImageTextPosition : 'text-top' }
							onChange={ ( value ) => setAttributes({ secondImageTextPosition: value }) }
							options={ [
								{
									label: __( 'Top' ),
									value: 'top',
								},
								{
									label: __( 'Bottom' ),
									value: 'bottom',
								},
							] }
							default={ 'bottom' }
						/>

						<ToggleControl
							label={ __( 'Show Overlays' ) }
							checked={ !! showOverlays }
							onChange={ () => setAttributes( { showOverlays: ! showOverlays } ) }
						/>
					</PanelBody>

					<PanelColor 
						title={ __( 'First Image Overlay Text Color' ) } 
						colorValue={ firstImageTextColor }
						onChange={ ( colorValue ) => setAttributes( { firstImageTextColor: colorValue } ) } 
						initialOpen={ false }
					>
						<ColorPalette
							label={ __( 'First Image Overlay Text Color' ) }
							value={ firstImageTextColor }
							onChange={ ( colorValue ) => setAttributes( { firstImageTextColor: colorValue } ) }
						/>
					</PanelColor>

					<PanelColor 
						title={ __( 'Second Image Overlay Text Color' ) } 
						colorValue={ secondImageTextColor } 
						onChange={ ( colorValue ) => setAttributes( { secondImageTextColor: colorValue } ) } 
						initialOpen={ false }
						>
						<ColorPalette
							label={ __( 'Second Image Overlay Text Color' ) }
							value={ secondImageTextColor }
							onChange={ ( colorValue ) => setAttributes( { secondImageTextColor: colorValue } ) }
						/>
					</PanelColor>
				</InspectorControls>
			</Fragment>
		);
	}
} );
