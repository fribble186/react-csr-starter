import color from "color";

function hexAlpha(
	colorVal: string | string[] | number[],
	alpha: number,
): string {
	// ensure alpha value is between 0-1
	const safeAlpha = Math.max(0, Math.min(1, alpha));

	// if color is CSS variable
	if (typeof colorVal === "string" && colorVal.startsWith("#")) {
		return color(colorVal).alpha(safeAlpha).toString();
	}

	throw new Error("Invalid color format");
}

/**
 * We recommend picking colors with these values for [Eva Color Design](https://colors.eva.design/):
 *  + lighter : 100
 *  + light : 300
 *  + main : 500
 *  + dark : 700
 *  + darker : 900
 */
export const paletteColors = {
	primary: {
		lighter: "#C8FAD6",
		light: "#5BE49B",
		default: "#00A76F",
		dark: "#007867",
		darker: "#004B50",
	},
	success: {
		lighter: "#D8FBDE",
		light: "#86E8AB",
		default: "#36B37E",
		dark: "#1B806A",
		darker: "#0A5554",
	},
	warning: {
		lighter: "#FFF5CC",
		light: "#FFD666",
		default: "#FFAB00",
		dark: "#B76E00",
		darker: "#7A4100",
	},
	error: {
		lighter: "#FFE9D5",
		light: "#FFAC82",
		default: "#FF5630",
		dark: "#B71D18",
		darker: "#7A0916",
	},
	info: {
		lighter: "#CAFDF5",
		light: "#61F3F3",
		default: "#00B8D9",
		dark: "#006C9C",
		darker: "#003768",
	},
	gray: {
		"100": "#F9FAFB",
		"200": "#F4F6F8",
		"300": "#DFE3E8",
		"400": "#C4CDD5",
		"500": "#919EAB",
		"600": "#637381",
		"700": "#454F5B",
		"800": "#1C252E",
		"900": "#141A21",
	},
};

export const commonColors = {
	white: "#FFFFFF",
	black: "#09090B",
};

export const actionColors = {
	hover: hexAlpha(paletteColors.gray[500], 0.1),
	selected: hexAlpha(paletteColors.gray[500], 0.1),
	focus: hexAlpha(paletteColors.gray[500], 0.12),
	disabled: hexAlpha(paletteColors.gray[500], 0.48),
	active: hexAlpha(paletteColors.gray[500], 1),
};

export const lightColorTokens = {
	palette: paletteColors,
	common: commonColors,
	action: actionColors,
	text: {
		primary: paletteColors.gray[800],
		secondary: paletteColors.gray[600],
		disabled: paletteColors.gray[500],
	},
	background: {
		default: commonColors.white,
		paper: commonColors.white,
		neutral: paletteColors.gray[200],
	},
};

export const darkColorTokens = {
	palette: paletteColors,
	common: commonColors,
	action: actionColors,
	text: {
		primary: commonColors.white,
		secondary: paletteColors.gray[500],
		disabled: paletteColors.gray[600],
	},
	background: {
		default: commonColors.black,
		paper: commonColors.black,
		neutral: "#27272A",
	},
};
