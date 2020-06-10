import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import { Box, Flex, theme } from "@cu-advancement/component-library";
import Header from "./Header";

const Layout = React.forwardRef(({ children, mainBg = "inherit" }, ref) => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
      }}
    >
      <Head>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://giving.cu.edu/sites/default/files/css/css_2s61uoy9A6nb4TmtSOQBzk3p3ndPIyob7CIol4jfYOs.css"
          media="all"
        />
      </Head>
      <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
        <Header sx={{ maxWidth: 1280, mx: "auto" }} />
        <Box
          ref={ref}
          sx={{
            flex: "1 1 auto",
            bg: mainBg,
          }}
          as="main"
        >
          {children}
        </Box>
      </Flex>
    </ThemeProvider>
  );
});

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  mainBg: PropTypes.string,
};
