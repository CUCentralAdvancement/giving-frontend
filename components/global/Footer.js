import React from 'react';
import { Box, Flex, Text, Grid, Menu, LinkButton, Link } from '@cu-advancement/component-library';
import { footerLinks } from '../../data/menus';

const PaddedText = ({ children }) => <Text sx={{ pl: [1, 0], pb: [1, 0], fontWeight: [1] }}>{children}</Text>;

const Footer = () => (
  <Box sx={{ bg: '#000', p: 3 }} as="footer">
    <Grid gap={2} columns={[1, 2, 4]} sx={{ maxWidth: 1280, mx: 'auto' }}>
      <Flex sx={{ py: 2, pl: [3, 0], flexDirection: 'column' }} color="#fff" fontWeight="light">
        <LinkButton
          variant="primary"
          sx={{ px: 4, color: 'text', fontSize: 3, mb: 2, fontWeight: 300 }}
          data-testid="footer-give-button"
          url="/fund-search"
        >
          Give Now
        </LinkButton>
        <PaddedText>CU Advancement | CU Foundation</PaddedText>
        <PaddedText>1800 Grant Street | Denver, CO 80203</PaddedText>
        <PaddedText>303-541-1290</PaddedText>
        <PaddedText>giving@cu.edu</PaddedText>
        <PaddedText>
          <Link sx={{ color: 'background' }} url="https://www.cu.edu/privacy-policy">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link sx={{ color: 'background' }} url="https://www.cu.edu/terms-service">
            Terms of Service
          </Link>
        </PaddedText>
      </Flex>
      <Box>
        <Menu title="About Us" links={footerLinks.about} variant="bgDark" linkDirection="column" />
      </Box>
      <Box>
        <Menu title="Quicklinks" links={footerLinks.quicklinks} variant="bgDark" linkDirection="column" />
      </Box>
      <Box>
        <Menu title="Campus Offices" links={footerLinks.campuses} variant="bgDark" linkDirection="column" />
      </Box>
    </Grid>
  </Box>
);

export default Footer;
