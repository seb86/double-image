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
const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;

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
			showFirstOverlay,
			showSecondOverlay,
			firstImageTextColor,
			hasFirstImageParallax,
			dimFirstImageRatio,
			firstImageTextPosition,
			secondImageTextColor,
			hasSecondImageParallax,
			dimSecondImageRatio,
			secondImageTextPosition
		} = attributes;

		const toggleFirstParallax  = () => setAttributes( { hasFirstImageParallax: ! hasFirstImageParallax } );
		const toggleSecondParallax = () => setAttributes( { hasSecondImageParallax: ! hasSecondImageParallax } );
		const setFirstDimRatio     = ( ratio ) => setAttributes( { dimFirstImageRatio: ratio } );
		const setSecondDimRatio    = ( ratio ) => setAttributes( { dimSecondImageRatio: ratio } );

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
					</PanelBody>

					<PanelBody title={ __( 'First Image Settings' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Fixed Background' ) }
							checked={ !! hasFirstImageParallax }
							onChange={ toggleFirstParallax }
						/>

						<ToggleControl
							label={ __( 'Show Overlay' ) }
							checked={ !! showFirstOverlay }
							onChange={ () => setAttributes( { showFirstOverlay: ! showFirstOverlay } ) }
						/>

						<RangeControl
							label={ __( 'Background Opacity' ) }
							value={ dimFirstImageRatio }
							onChange={ setFirstDimRatio }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>

						<ColorPalette
							label={ __( 'Overlay Text Color' ) }
							value={ firstImageTextColor }
							onChange={ ( colorValue ) => setAttributes( { firstImageTextColor: colorValue } ) }
						/>

						<SelectControl
							key={ 'overlay-text-postition-selector' }
							label={ __( 'Overlay Text Position' ) }
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
					</PanelBody>

					<PanelBody title={ __( 'Second Image Settings' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Fixed Background' ) }
							checked={ !! hasSecondImageParallax }
							onChange={ toggleSecondParallax }
						/>

						<ToggleControl
							label={ __( 'Show Overlay' ) }
							checked={ !! showSecondOverlay }
							onChange={ () => setAttributes( { showSecondOverlay: ! showSecondOverlay } ) }
						/>

						<RangeControl
							label={ __( 'Background Opacity' ) }
							value={ dimSecondImageRatio }
							onChange={ setSecondDimRatio }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>

						<ColorPalette
							label={ __( 'Overlay Text Color' ) }
							value={ secondImageTextColor }
							onChange={ ( colorValue ) => setAttributes( { secondImageTextColor: colorValue } ) }
						/>

						<SelectControl
							key={ 'overlay-text-postition-selector' }
							label={ __( 'Overlay Text Position' ) }
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
					</PanelBody>

				</InspectorControls>
			</Fragment>
		);
	}
} );
