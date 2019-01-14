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
const { InspectorControls, ColorPalette, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;

/**
 * Contrast checker
 */
/*const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	const textColorValue = textColor && textColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColorValue && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColorValue || ! node ? undefined : getComputedStyle( node ).backgroundColor,
		fallbackTextColor: textColorValue || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} );*/

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			format,
			dimFirstImageRatio,
			firstImageID,
			firstImageTextColor,
			firstImageTextStyle,
			firstImageTextPosition,
			hasFirstImageParallax,
			showFirstOverlay,
			dimSecondImageRatio,
			hasSecondImageParallax,
			secondImageID,
			secondImageTextColor,
			secondImageTextStyle,
			secondImageTextPosition,
			showSecondOverlay,
		} = attributes;

		const toggleFirstParallax = () => setAttributes( { hasFirstImageParallax: ! hasFirstImageParallax } );
		const toggleSecondParallax = () => setAttributes( { hasSecondImageParallax: ! hasSecondImageParallax } );
		const setFirstDimRatio = ( ratio ) => setAttributes( { dimFirstImageRatio: ratio } );
		const setSecondDimRatio = ( ratio ) => setAttributes( { dimSecondImageRatio: ratio } );

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Image Layout' ) } className="double-image__inspector-block-settings-panel-body">
							<SelectControl
								value={ format ? format : 'n-w' }
								onChange={ ( value ) => setAttributes( { format: value } ) }
								options={ [
									{
										label: __( 'Narrow | Wide' ),
										value: 'n-w',
									},
									{
										label: __( 'Wide | Narrow' ),
										value: 'w-n',
									},
									{
										label: __( 'Even' ),
										value: 'even',
									},
									{
										label: __( 'Stacked' ),
										value: 'stacked',
									},
								] }
							/>
						</PanelBody>

						{ firstImageID && (
							<PanelBody title={ __( 'First Image' ) } initialOpen={ false }>
								<ToggleControl
									label={ __( 'Fixed Background' ) }
									checked={ !! hasFirstImageParallax }
									onChange={ toggleFirstParallax }
									help={ __( 'Enable to have a parallax scrolling effect.' ) }
								/>

								<ToggleControl
									label={ __( 'Show Overlay' ) }
									checked={ !! showFirstOverlay }
									onChange={ () => setAttributes( { showFirstOverlay: ! showFirstOverlay } ) }
									help={ __( 'Enable to add a text overlay for the first image.' ) }
								/>

								{ showFirstOverlay && (
									<RangeControl
										label={ __( 'Background Opacity' ) }
										value={ dimFirstImageRatio }
										onChange={ setFirstDimRatio }
										min={ 0 }
										max={ 100 }
										step={ 10 }
										help={ __( 'Change the background opacity for the overlay.' ) }
									/>
								) }

								{ showFirstOverlay && (
									<label className="components-base-control__label" htmlFor="inspector-color-palette">{ __( 'Overlay Text Color' ) }</label>
								) }
								{ showFirstOverlay && (
									<ColorPalette
										label={ __( 'Overlay Text Color' ) }
										value={ firstImageTextColor }
										onChange={ ( colorValue ) => setAttributes( { firstImageTextColor: colorValue } ) }
									/>
								) }

								{ showFirstOverlay && (
									<SelectControl
										label={ __( 'Overlay Text Position' ) }
										value={ firstImageTextPosition ? firstImageTextPosition : 'text-top' }
										onChange={ ( value ) => setAttributes( { firstImageTextPosition: value } ) }
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
										help={ __( 'Place overlay text at the top or bottom.' ) }
									/>
								) }

								{ showFirstOverlay && (
									<SelectControl
										label={ __( 'Overlay Font Style' ) }
										value={ firstImageTextStyle ? firstImageTextStyle : 'normal' }
										onChange={ ( value ) => setAttributes( { firstImageTextStyle: value } ) }
										options={ [
											{
												label: __( 'Normal' ),
												value: 'normal',
											},
											{
												label: __( 'Italic' ),
												value: 'italic',
											},
										] }
									/>
								) }

							</PanelBody>
						) }

						{ secondImageID && (
							<PanelBody title={ __( 'Second Image' ) } initialOpen={ false }>
								<ToggleControl
									label={ __( 'Fixed Background' ) }
									checked={ !! hasSecondImageParallax }
									onChange={ toggleSecondParallax }
									help={ __( 'Enable to have a parallax scrolling effect.' ) }
								/>

								<ToggleControl
									label={ __( 'Show Overlay' ) }
									checked={ !! showSecondOverlay }
									onChange={ () => setAttributes( { showSecondOverlay: ! showSecondOverlay } ) }
									help={ __( 'Enable to add a text overlay for the second image.' ) }
								/>

								{ showSecondOverlay && (
									<RangeControl
										label={ __( 'Background Opacity' ) }
										value={ dimSecondImageRatio }
										onChange={ setSecondDimRatio }
										min={ 0 }
										max={ 100 }
										step={ 10 }
										help={ __( 'Change the background opacity for the overlay.' ) }
									/>
								) }

								{ showSecondOverlay && (
									<label className="components-base-control__label" htmlFor="inspector-color-palette">{ __( 'Overlay Text Color' ) }</label>
								) }
								{ showSecondOverlay && (
									<ColorPalette
										label={ __( 'Overlay Text Color' ) }
										value={ secondImageTextColor }
										onChange={ ( colorValue ) => setAttributes( { secondImageTextColor: colorValue } ) }
									/>
								) }

								{ showSecondOverlay && (
									<SelectControl
										label={ __( 'Overlay Text Position' ) }
										value={ secondImageTextPosition ? secondImageTextPosition : 'text-top' }
										onChange={ ( value ) => setAttributes( { secondImageTextPosition: value } ) }
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
										help={ __( 'Place overlay text at the top or bottom.' ) }
									/>
								) }

								{ showSecondOverlay && (
									<SelectControl
										label={ __( 'Overlay Font Style' ) }
										value={ secondImageTextStyle ? secondImageTextStyle : 'normal' }
										onChange={ ( value ) => setAttributes( { secondImageTextStyle: value } ) }
										options={ [
											{
												label: __( 'Normal' ),
												value: 'normal',
											},
											{
												label: __( 'Italic' ),
												value: 'italic',
											},
										] }
									/>
								) }

							</PanelBody>
						) }

					</InspectorControls>
				</Fragment>
			)
		);
	}
}

export default compose( [
	Colors,
] )( Inspector );
