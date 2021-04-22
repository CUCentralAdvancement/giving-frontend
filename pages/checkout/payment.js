import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/global/Layout";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authorizeNetToken, transactionDetails } from "../../data/store";

export default function Payment() {
  const token = useRecoilValue(authorizeNetToken);
  const setTransactionDetails = useSetRecoilState(transactionDetails);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.querySelector("#send_token").submit();

      if (!window.AuthorizeNetIFrame) {
        window.AuthorizeNetIFrame = {};
        window.AuthorizeNetIFrame.onReceiveCommunication = function (querystr) {
          var params = parseQueryString(querystr);
          let ifrm = {};
          switch (params["action"]) {
            case "successfulSave":
              break;
            case "cancel":
              router.push("/checkout");
              break;
            case "resizeWindow":
              var w = parseInt(params["width"]);
              var h = parseInt(params["height"]);
              ifrm = document.getElementById("add_payment");
              ifrm.style.width = w.toString() + "px";
              ifrm.style.height = h.toString() + "px";
              break;
            case "transactResponse":
              ifrm = document.getElementById("add_payment");
              ifrm.style.display = "none";

              setTransactionDetails(JSON.parse(params["response"]));
              router.push("/checkout/complete");
          }
        };
      }
    }
  }, [router, setTransactionDetails]);
  return (
    <Layout>
      <div className="flex flex-col max-w-screen-lg mx-auto my-3">
        <div className="flex flex-row p-3 mb-2 justify-center"
          style={{
            bg: "#FFFFE0",
            border: "2px solid #F0E5C5",
          }}
        >
          <img
            src="https://giving-test.cu.edu/sites/all/themes/themekit/images/warning.svg"
            className="mr-2"
            sx={{ height: "25px" }}
            alt="Warning Icon"
          />
          <span> Please do not use Refresh or Back buttons on this page.</span>
        </div>
        <div
          id="iframe_holder"
          className="center-block"
          style={{ width: "90%", maxWidth: "1020px", height: "640px" }}
        >
          <iframe
            id="add_payment"
            data-cy="add_payment"
            className="embed-responsive-item panel"
            name="add_payment"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="yes"
            // hidden="true"
            title="Authorize.net Payment Form"
          ></iframe>
        </div>
        <img
          src="https://giving-test.cu.edu/sites/all/themes/themekit/images/verified-auth-net.png"
          className="mx-auto mt-2"
          style={{ width: "135px" }}
          alt="Verified by Authorize.net"
        />
      </div>
      <form
        id="send_token"
        action="https://test.authorize.net/payment/payment"
        method="post"
        target="add_payment"
      >
        <input type="hidden" name="token" value={token} />
      </form>
    </Layout>
  );
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
