#!/bin/sh
#―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
# Name: build.sh
# Desc: Generates preview-images and LibreOffice color-scheme from palette.json.
# Reqs: node, zip
# Auth: jadedctrl
# Lisc: MIT
#―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

palettes="frappe:frappé latte:latte macchiato:macchiato mocha:mocha"

for palette in $palettes; do
	code="$(echo "$palette" | cut --fields=1 --delimiter=':')"
	title="$(echo "$palette" | cut --fields=2 --delimiter=':')"
	bin/images.js "$code" > images/"$code".svg
	bin/palettes.js "$code" > palette/"$title".soc
done

zip -r ../catppuccin.oxt *
