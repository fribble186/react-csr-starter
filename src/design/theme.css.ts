import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { baseThemeTokens } from "./tokens/base";
import { typographyTokens } from "./tokens/typography";
import { lightColorTokens } from "./tokens/color";
import { lightShadowTokens } from "./tokens/shadow";
import { designTokenContract } from "./contract";
import { addColorChannels } from "@/utils/theme";

export const themeVars = createThemeContract({
	...designTokenContract,
	colors: addColorChannels(designTokenContract.colors),
});

createGlobalTheme(":root", themeVars, {
	colors: addColorChannels(lightColorTokens),
	typography: typographyTokens,
	shadows: lightShadowTokens,
	...baseThemeTokens,
});
