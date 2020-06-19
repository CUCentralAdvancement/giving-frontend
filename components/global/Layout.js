import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import { Box, Flex, theme } from "@cu-advancement/component-library";
import Header from "./Header";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

const Layout = React.forwardRef(({ children, mainBg = "inherit" }, ref) => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
      }}
    >
      <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        </AnimatePresence>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
});

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  mainBg: PropTypes.string,
};
