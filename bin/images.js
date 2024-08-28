#!/usr/bin/env node
const palette = require('../palette/palette.json');

const cell_width = 100
const cell_height = 100
const columns = 6;
const rows = 5;
const image_width = columns * cell_width + cell_width * .5;
const image_height = rows * cell_width;
const font_size=19

function usage() {
	console.log(`usage: images.js PALETTE

Will print a an SVG file showing a preview of a palette, where
PALETTE corresponds to a palette-code from ../palette/palette.json,
relative to the script.`);
	process.exit();
}


function color_rect(hex, name, x, y, width, height) {
	console.log(`\n	<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${hex}" />
	<text x="${x + width/2}" y="${y + height/2}"
	      dominant-baseline="middle" text-anchor="middle"
	      font-size="${font_size}" font-family="sans" font-weight="bold"
	      fill="white" stroke="black" stroke-width="1">
		${name}
	</text>`);
}



scheme = process.argv[2];
if (typeof scheme == 'undefined')
	usage();


console.log(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${image_width}" height="${image_height}"
     viewBox="0 0 ${image_width} ${image_height}"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`);


// Initial state.
x = cell_width * .5;
y = 0;
column = 0;
row = 0;

const colors = Object.values(palette[scheme].colors);
for (color of colors) {
	color_rect(color.hex, color.name, x, y, cell_width, cell_height);

	column++;
	x += cell_width;

	// Note that we want the third row to have one extra cell, so we can fit all
	// colours into the picture.
	if ((row != 2 && column == 5) || (row == 2 && column == 6)) {
		row++;
		column = 0;

		// All rows but the third get an offset.
		x = cell_width * .5;
		if (row == 2)
			x = 0;
		y += cell_height;
	}
}

console.log('</svg>');
