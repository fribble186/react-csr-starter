import color from "color";
import { designTokenContract } from "../design/contract";

// is leaf object
type IsLeafObject<T> = T extends object
	? T[keyof T] extends null | string
		? true
		: false
	: false;
// add channel
type AddChannelToLeaf<T> = T extends object
	? IsLeafObject<T> extends true
		? T & { [K in keyof T as `${string & K}Channel`]: string } // only add channel to leaf
		: { [K in keyof T]: AddChannelToLeaf<T[K]> } // recursive other level
	: T;

/**
 * get variants in {@link themeTokens}
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `["lighter", "light", "main", "dark", "darker"]`
 */
export const getThemeTokenVariants = (propertyPath: string) => {
	const keys = propertyPath.split(".");
	const val = keys.reduce((obj: any, key) => {
		if (obj && typeof obj === "object") {
			return obj[key];
		}
		return null;
	}, designTokenContract);

	return val ? Object.keys(val) : [];
};

/**
 * convert to CSS vars
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `--colors-palette-primary`
 */
export const toCssVar = (propertyPath: string) => {
	return `--${propertyPath.split(".").join("-")}`;
};

/**
 * convert to CSS vars
 */
export const createTailwindConfig = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	const result = variants.reduce(
		(acc, variant) => {
			acc[variant] = `var(${toCssVar(`${propertyPath}-${variant}`)})`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * Get RGB values from color channels
 * @param propertyPath example: `colors.palette.primary`
 * @returns example: `{ DEFAULT: "rgb(var(--colors-palette-primary-defaultChannel))" }`
 */
export const creatColorChannel = (propertyPath: string) => {
	const variants = getThemeTokenVariants(propertyPath);
	const result = variants.reduce(
		(acc, variant) => {
			const variantKey = variant === "default" ? "DEFAULT" : variant;
			acc[variantKey] =
				`rgb(var(${toCssVar(`${propertyPath}-${variant}Channel`)}))`;
			return acc;
		},
		{} as Record<string, string>,
	);
	return result;
};

/**
 * add color channels to the color tokens {@link themeTokens}
 * @param obj example: `{ palette: { primary: "#000000" } }`
 * @returns example: `{ palette: { primary: "#000000", primaryChannel: "0, 0, 0" } }`
 */
export const addColorChannels = <T extends Record<string, any>>(
	obj: T,
): AddChannelToLeaf<T> => {
	const result: Record<string, any> = {};

	// check if the object is a leaf object
	const isLeafObject = Object.values(obj).every(
		(v) => v === null || typeof v === "string",
	);

	if (isLeafObject) {
		// add channel to the leaf object
		for (const [key, value] of Object.entries(obj)) {
			result[key] = value;
			result[`${key}Channel`] = color(value).rgb().array().join(" ");
		}
	} else {
		// recursively process non-leaf objects
		for (const [key, value] of Object.entries(obj)) {
			if (typeof value === "object" && value !== null) {
				result[key] = addColorChannels(value);
			} else {
				result[key] = value;
			}
		}
	}

	return result as AddChannelToLeaf<T>;
};
