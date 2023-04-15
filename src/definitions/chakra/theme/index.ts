import colors from "./foundations/colors";
import { extendTheme } from "@chakra-ui/react";
import fontSizes from "./foundations/fontSizes";
import styles from "./styles";

/**
 * This file is generated for providing a custom theme to Chakra UI
 *
 * To learn more about custom themes
 * please visit https://chakra-ui.com/docs/getting-started#add-custom-theme-optional
 */

const overrides = {
    initialColorMode: 'light',
    useSystemColorMode: false,
    ...styles,
    colors,
    fontSizes,
};

const theme = extendTheme(overrides,{components:{}});

export default theme;
