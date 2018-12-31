/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

/**
 * Register Block
 */
import * as doubleImage from './block/double-image';

export function registerBlocks () {
	[
		doubleImage,
	].forEach( ( block ) => {

		if ( ! block ) {
			return;
		}

		const { name, settings } = block;

		registerBlockType( `double-image/${ name }`, { category: 'common', ...settings } );
	} );
};
registerBlocks();