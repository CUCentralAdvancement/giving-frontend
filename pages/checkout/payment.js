import React, { useEffect } from "react";
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

export default function Payment({ token }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.querySelector("#send_token").submit();
    }
  }, []);
  return (
    <Layout>
      <Flex
        sx={{
          maxWidth: "1020px",
          mx: "auto",
          flexDirection: "column",
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
            alt="Warning Icon"
          />
          <Text> Please do not use Refresh or Back buttons on this page.</Text>
        </Flex>
        <div
          id="iframe_holder"
          className="center-block"
          style={{ width: "90%", maxWidth: "1000px", height: "600px" }}
        >
          <iframe
            id="add_payment"
            className="embed-responsive-item panel"
            name="add_payment"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            // hidden="true"
            title="Authorize.net Payment Form"
          ></iframe>
        </div>
        <Image
          src="https://giving-test.cu.edu/sites/all/themes/themekit/images/verified-auth-net.png"
          sx={{ width: "135px", mx: "auto" }}
          alt="Verified by Authorize.net"
        />
        <Box sx={{ mx: "auto", my: 3 }}>
          <Link href={`/checkout/complete`}>
            <a>
              <Button
                variant="button.secondary"
                type="submit"
                data-testid="complete-purchase-button"
              >
                Complete purchase and clear cart...
              </Button>
            </a>
          </Link>
        </Box>
      </Flex>
      <form
        id="send_token"
        action="https://test.authorize.net/payment/payment"
        method="post"
        target="add_payment"
      >
        <input type="hidden" name="token" value={token} />
      </form>
      {(function () {
        if (typeof window !== "undefined" && !window.AuthorizeNetIFrame) {
          window.AuthorizeNetIFrame = {};
          AuthorizeNetIFrame.onReceiveCommunication = function (querystr) {
            var params = parseQueryString(querystr);
            switch (params["action"]) {
              case "successfulSave":
                break;
              case "cancel":
                break;
              case "resizeWindow":
                var w = parseInt(params["width"]);
                var h = parseInt(params["height"]);
                var ifrm = document.getElementById("add_payment");
                ifrm.style.width = w.toString() + "px";
                ifrm.style.height = h.toString() + "px";
                break;
              case "transactResponse":
                var ifrm = document.getElementById("add_payment");
                ifrm.style.display = "none";
            }
          };
        }

        function parseQueryString(str) {
          var vars = [];
          var arr = str.split("&");
          var pair;
          for (var i = 0; i < arr.length; i++) {
            pair = arr[i].split("=");
            vars.push(pair[0]);
            vars[pair[0]] = unescape(pair[1]);
          }
          return vars;
        }
      })()}
    </Layout>
  );
}

export async function getServerSideProps({}) {
  // Fetch data from external API
  const res = await fetch("http://localhost:3000/api/authorize-token");
  const token = await res.json();

  // Pass data to the page via props
  return { props: { token: token.token } };
}
