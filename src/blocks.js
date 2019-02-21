/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Custom background color for block
const backgroundColor = '#61d8aa';

// Custom foreground icon color
const iconColor = '#eee';

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

		registerBlockType( `double-image/${ name }`, { category: 'common', icon: { background: backgroundColor, foreground: iconColor, src: icon, }, ...settings } );
	} );
};
registerBlocks();