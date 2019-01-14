/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Custom foreground icon color
const iconColor = '#4a0d0d';

// Register Block
import * as doubleImage from './block/double-image';

export function registerBlocks () {
	[
		doubleImage,
	].forEach( ( block ) => {

		if ( ! block ) {
			return;
		}

		const { name, icon, settings } = block;

		registerBlockType( `double-image/${ name }`, { category: 'common', icon: { src: icon, foreground: iconColor, }, ...settings } );
	} );
};
registerBlocks();