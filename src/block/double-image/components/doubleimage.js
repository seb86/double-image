/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;

export default class DoubleImage extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const {
			format,
			align,
		} = attributes;

		const classes = classnames(
			className,
			format ? `format-${ format }` : '1-4',
			align ? `align-${ align }` : null,
		);

		return (
			<Fragment>
				<div className={ classes }>
					{ this.props.children }
				</div>
			</Fragment>
		);
	}
}
