import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  disableTransitionOnChange: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        transitionProperty: "all",
        transitionDuration: "500ms",
      },
    },
  },
});

export default theme;
