#!/usr/bin/env node
const palette = require('../palette/palette.json');

function usage() {
	console.log(`usage: palettes.js PALETTE [PALETTE.JSON]

Will print a LibreOffice-format palette-file (.SOC) to stdout,
corresponding to the palette-code passed as the PALETTE parameter.
Palettes will be read from ../palette/palette.json relative
to the script.`)
	process.exit();
}



function color_def(hex, name) {
	console.log(`\t<draw:color draw:name="${name}" draw:color="${hex}"/>`);
}


scheme = process.argv[2];
if (typeof scheme == 'undefined')
	usage();


console.log(`<?xml version="1.0" encoding="UTF-8"?>
<office:color-table xmlns:office="http://openoffice.org/2000/office"
                    xmlns:style="http://openoffice.org/2000/style"
                    xmlns:text="http://openoffice.org/2000/text"
                    xmlns:table="http://openoffice.org/2000/table"
                    xmlns:draw="http://openoffice.org/2000/drawing"
                    xmlns:fo="http://www.w3.org/1999/XSL/Format"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:meta="http://openoffice.org/2000/meta"
                    xmlns:number="http://openoffice.org/2000/datastyle"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns:chart="http://openoffice.org/2000/chart"
                    xmlns:dr3d="http://openoffice.org/2000/dr3d"
                    xmlns:math="http://www.w3.org/1998/Math/MathML"
                    xmlns:form="http://openoffice.org/2000/form"
                    xmlns:script="http://openoffice.org/2000/script">`);


const colors = Object.values(palette[scheme].colors);
for (color of colors) {
	color_def(color.hex, color.name);
}

console.log('</office:color-table>');
