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
		} = attributes;

		return (
			<Fragment>
				<div
					className={ classnames(
						className,
						format ? `format-${ format }` : 'format-1-4',
					) }
				>
					{ this.props.children }
				</div>
			</Fragment>
		);
	}
}
