import React from "react";
import Link from "next/link";
import Layout from "../../components/global/Layout";
import {
  Heading,
  Flex,
  Button,
  Text,
  Image,
  Box,
} from "@cu-advancement/component-library";

export default function Payment() {
  return (
    <Layout>
      <Flex
        sx={{
          maxWidth: "1020px",
          mx: "auto",
          flexDirection: "column",
          // justifyContent: "center",
        }}
      >
        <Flex
          sx={{
            bg: "#FFFFE0",
            border: "2px solid #F0E5C5",
            p: 3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image
            src="https://giving-test.cu.edu/sites/all/themes/themekit/images/warning.svg"
            sx={{ mr: 2, width: "25px" }}
          />
          <Text> Please do not use Refresh or Back buttons on this page.</Text>
        </Flex>
        <Heading sx={{ mt: 4, textAlign: "center" }}>
          Authorize.net Form Goes Here
        </Heading>
        <Image
          src="https://giving-test.cu.edu/sites/all/themes/themekit/images/verified-auth-net.png"
          sx={{ width: "135px", mx: "auto" }}
        />
        <Box sx={{ mx: "auto", my: 3 }}>
          <Link href={`/checkout/complete`}>
            <a>
              <Button variant="button.secondary" type="submit">
                See What Happens Next...
              </Button>
            </a>
          </Link>
        </Box>
      </Flex>
    </Layout>
  );
}