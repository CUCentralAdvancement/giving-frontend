import React from 'react';
// import Head from "next/head";
import { ThemeProvider } from 'theme-ui';
import { Box, Flex, theme } from '@cu-advancement/component-library';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import FadeIn from './FadeIn';

/* eslint-disable */
const AdminLayout = React.forwardRef(({ children, role, mainBg = 'inherit' }, ref) => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
      }}
    >
      <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
        <AdminHeader sx={{ flexShrink: 0 }} />
        <Box
          ref={ref}
          sx={{
            flex: '1 0 auto',
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

export default AdminLayout;
