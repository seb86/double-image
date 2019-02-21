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
			firstImageID,
			firstOverlayColor,
			firstOverlayRatio,
			firstOverlayTextColor,
			firstOverlayTextPosition,
			firstOverlayTextStyle,
			hasFirstImageParallax,
			showFirstOverlay,
			hasSecondImageParallax,
			secondImageID,
			secondOverlayTextColor,
			secondOverlayTextPosition,
			secondOverlayTextStyle,
			secondOverlayColor,
			secondOverlayRatio,
			showSecondOverlay,
		} = attributes;

		const toggleFirstParallax = () => setAttributes( { hasFirstImageParallax: ! hasFirstImageParallax } );
		const toggleSecondParallax = () => setAttributes( { hasSecondImageParallax: ! hasSecondImageParallax } );
		const setFirstOverlayBG = ( color ) => setAttributes( { firstOverlayColor: color } );
		const setFirstOverlayColor = ( color ) => setAttributes( { firstOverlayTextColor: color } );
		const setFirstDimRatio = ( ratio ) => setAttributes( { firstOverlayRatio: ratio } );
		const setSecondOverlayBG = ( color ) => setAttributes( { secondOverlayColor: color } );
		const setSecondOverlayColor = ( color ) => setAttributes( { secondOverlayTextColor: color } );
		const setSecondDimRatio = ( ratio ) => setAttributes( { secondOverlayRatio: ratio } );

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
									help={ __( 'Enable to add a text overlay.' ) }
								/>

								{ showFirstOverlay && (
									<PanelColorSettings
										title={ __( 'Overlay Settings' ) }
										colorSettings={ [
											{
												value: firstOverlayColor,
												onChange: setFirstOverlayBG,
												label: __( 'Background Color' ),
											},
											{
												value: firstOverlayTextColor,
												onChange: setFirstOverlayColor,
												label: __( 'Text Color' ),
											},
										] }
									>
										{ firstOverlayColor && (
											<RangeControl
												label={ __( 'Background Opacity' ) }
												value={ firstOverlayRatio }
												onChange={ setFirstDimRatio }
												min={ 0 }
												max={ 100 }
												step={ 10 }
												help={ __( 'Change the background opacity for the background color.' ) }
											/>
										) }

										<SelectControl
											label={ __( 'Text Position' ) }
											value={ firstOverlayTextPosition ? firstOverlayTextPosition : 'text-top' }
											onChange={ ( value ) => setAttributes( { firstOverlayTextPosition: value } ) }
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

										<SelectControl
											label={ __( 'Font Style' ) }
											value={ firstOverlayTextStyle ? firstOverlayTextStyle : 'normal' }
											onChange={ ( value ) => setAttributes( { firstOverlayTextStyle: value } ) }
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

									</PanelColorSettings>
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
									help={ __( 'Enable to add a text overlay.' ) }
								/>

								{ showSecondOverlay && (
									<PanelColorSettings
										title={ __( 'Overlay Settings' ) }
										colorSettings={ [
											{
												value: secondOverlayColor,
												onChange: setSecondOverlayBG,
												label: __( 'Background Color' ),
											},
											{
												value: secondOverlayTextColor,
												onChange: setSecondOverlayColor,
												label: __( 'Text Color' ),
											},
										] }
									>
										{ secondOverlayColor && (
											<RangeControl
												label={ __( 'Background Opacity' ) }
												value={ secondOverlayRatio }
												onChange={ setSecondDimRatio }
												min={ 0 }
												max={ 100 }
												step={ 10 }
												help={ __( 'Change the background opacity for the background color.' ) }
											/>
										) }

										<SelectControl
											label={ __( 'Text Position' ) }
											value={ secondOverlayTextPosition ? secondOverlayTextPosition : 'text-top' }
											onChange={ ( value ) => setAttributes( { secondOverlayTextPosition: value } ) }
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

										<SelectControl
											label={ __( 'Font Style' ) }
											value={ secondOverlayTextStyle ? secondOverlayTextStyle : 'normal' }
											onChange={ ( value ) => setAttributes( { secondOverlayTextStyle: value } ) }
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

									</PanelColorSettings>
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
