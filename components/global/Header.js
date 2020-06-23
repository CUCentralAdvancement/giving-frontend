import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import {
  Badge,
  Box,
  Flex,
  Image,
  Link as CULink,
  Button,
  Text,
} from "@cu-advancement/component-library";
import { userCart } from "../../data/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/pro-regular-svg-icons";

export default function Header() {
  const cart = useRecoilValue(userCart);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setCartItems(parseInt(cart.length));
  }, [cart]);

  return (
    <Flex
      as="header"
      role="banner"
      sx={{
        flexDirection: "row",
        maxWidth: 1280,
        mx: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 3,
      }}
    >
      <Box sx={{ p: 2, mr: 2 }}>
        <Image
          src="https://giving.cu.edu/sites/all/themes/themekit/images/logo.svg"
          sx={{ width: "317px" }}
          data-testid="header-cu-logo"
        />
      </Box>
      <Box sx={{ fontSize: 3, textTransform: "uppercase", p: 2 }}>
        <StyledLink url="https://giving.cu.edu/guide-giving">
          Guide to Giving
        </StyledLink>
        <StyledLink
          url="https://giving.cu.edu/essentialcu"
          sx={{
            borderLeft: "2px solid #E2E3E4",
          }}
        >
          Essential CU
        </StyledLink>
        <StyledLink
          url="https://giving.cu.edu/about-us"
          sx={{
            borderLeft: "2px solid #E2E3E4",
          }}
        >
          About Us
        </StyledLink>
      </Box>
      <Box sx={{ p: 2 }}>
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text sx={{ ml: "20px", height: "40px" }}>
            <Link href="/cart">
              <a
                className="cart-items-total"
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontWeight: 700,
                }}
              >
                <Box sx={{ mr: "6px", display: "inline", fontSize: 4 }}>
                  <FontAwesomeIcon
                    style={{ height: "20px" }}
                    icon={faShoppingBasket}
                  />
                </Box>
                Gift Basket
                <Badge
                  sx={{
                    ml: 2,
                    borderRadius: "50%",
                    height: "20px",
                    width: "20px",
                    textAlign: "center",
                    backgroundColor: cartItems > 0 ? "secondary" : "#fff",
                  }}
                >
                  <span style={{ paddingTop: "1px" }}>{cartItems}</span>
                </Badge>
              </a>
            </Link>
          </Text>
          <Link href="/fund-search">
            <a>
              <Button
                sx={{
                  textTransform: "uppercase",
                  color: "text",
                  fontWeight: "bold",
                  mb: "36px",
                  mt: 1,
                  cursor: "pointer",
                }}
              >
                Give Now
              </Button>
            </a>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

function StyledLink({ children, sx, url }) {
  return (
    <CULink
      sx={{
        ...sx,
        p: 3,
        textDecoration: "none",
        color: "text",
      }}
      url={url}
    >
      <Text
        sx={{
          display: "inline",
          ":hover": {
            borderBottom: "4px solid",
            borderBottomColor: "primary",
          },
        }}
      >
        {children}
      </Text>
    </CULink>
  );
}
