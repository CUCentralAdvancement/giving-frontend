import React from "react";
import PropTypes from "prop-types";
// import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import { Box, Flex, theme } from "@cu-advancement/component-library";
import Header from "./Header";
import Footer from "./Footer";
import FadeIn from "./FadeIn";

const Layout = React.forwardRef(({ children, mainBg = "inherit" }, ref) => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
      }}
    >
      <Flex sx={{ flexDirection: "column", height: "100vh" }}>
        <Header sx={{ flexShrink: 0 }} />
        <Box
          ref={ref}
          sx={{
            flex: "1 0 auto",
            bg: mainBg,
          }}
          as="main"
        >
          <FadeIn>{children}</FadeIn>
        </Box>
        <Footer sx={{ flexShrink: 0 }} />
      </Flex>
    </ThemeProvider>
  );
});

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  mainBg: PropTypes.string,
};
