import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@cu-advancement/component-library";
// import { store } from "../data/store";

export default function Header() {
  // const { state } = useContext(store);
  const [cartItems, setCartItems] = useState(0);

  // useEffect(() => {
  //   setCartItems(parseInt(state.cart.length));
  // }, [state.cart]);

  return (
    <>
      <header id="header" role="banner">
        <a
          href="/"
          title="Home"
          rel="home"
          id="logo"
          style={{ marginRight: "2.75rem" }}
        ></a>

        <div className="nav-wrap">
          <a id="main-menu-trigger" href="#" className="menu-trigger-processed">
            Menu
          </a>
          <div className="region region-navigation">
            <div
              id="block-cu-fund-blocks-cu-cart-total"
              className="block block-cu-fund-blocks first odd"
              style={{ marginRight: "-0.20rem" }}
            >
              <Link href="/cart">
                <a className="cart-items-total">
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
                    {cartItems}
                  </Badge>
                </a>
              </Link>
            </div>
            <div
              id="block-search-form"
              className="block block-search even"
              role="search"
              style={{ display: "none" }}
            >
              <form
                className="google-cse selectize-processed"
                action="/fund-search"
                method="post"
                id="search-block-form"
                acceptCharset="UTF-8"
              >
                <div>
                  <div className="search-trigger search-toggle-processed"></div>
                  <div className="form-container">
                    <h2 className="element-invisible">Search form</h2>
                    <div className="form-item form-type-textfield form-item-search-block-form">
                      <label
                        className="element-invisible"
                        htmlFor="edit-search-block-form--2"
                      >
                        Search
                      </label>
                      <input
                        title="Enter the terms you wish to search for."
                        type="text"
                        id="edit-search-block-form--2"
                        name="search_block_form"
                        size="15"
                        maxLength="128"
                        className="form-text iCheck-processed"
                      />
                    </div>
                    <div
                      className="form-actions form-wrapper"
                      id="edit-actions"
                    >
                      <input
                        type="submit"
                        id="edit-submit"
                        name="op"
                        value="Search"
                        className="form-submit iCheck-processed"
                      />
                    </div>
                    <input
                      type="hidden"
                      name="form_build_id"
                      value="form-h2iN_tnmPqnsFaopaNELkfKUvMX32gboyjZRuwCVEBQ"
                      className="iCheck-processed"
                    />
                    <input
                      type="hidden"
                      name="form_id"
                      value="search_block_form"
                      className="iCheck-processed"
                    />
                  </div>
                </div>
              </form>
            </div>
            <nav
              id="block-menu-block-2"
              className="block block-menu-block last odd"
              role="navigation"
            >
              <ul className="menu-block-wrapper menu-block-2 menu-name-main-menu parent-mlid-0 menu-level-1 menu">
                <li className="menu__item is-expanded first expanded menu-mlid-3899 menu-item-processed">
                  <a
                    href="https://giving.cu.edu/guide-giving"
                    className="menu__link"
                  >
                    Guide to Giving
                  </a>
                  <ul className="expanded-child">
                    <li className="menu__item is-leaf first leaf menu-mlid-3900">
                      <a
                        href="https://giving.cu.edu/guide-giving#section-1"
                        title=""
                        className="menu__link"
                      >
                        One-Time Gifts
                      </a>
                    </li>
                    <li className="menu__item is-leaf leaf menu-mlid-3901">
                      <a
                        href="https://giving.cu.edu/guide-giving#section-2"
                        title=""
                        className="menu__link"
                      >
                        Recurring Gifts
                      </a>
                    </li>
                    <li className="menu__item is-leaf leaf menu-mlid-3902">
                      <a
                        href="https://giving.cu.edu/guide-giving#section-3"
                        title=""
                        className="menu__link"
                      >
                        Pledges
                      </a>
                    </li>
                    <li className="menu__item is-leaf leaf menu-mlid-3903">
                      <a
                        href="https://giving.cu.edu/guide-giving#section-4"
                        className="menu__link"
                      >
                        Gift Planning
                      </a>
                    </li>
                    <li className="menu__item is-leaf leaf menu-mlid-3904">
                      <a
                        href="https://giving.cu.edu/guide-giving#section-5"
                        title=""
                        className="menu__link"
                      >
                        Crowdfunding
                      </a>
                    </li>
                    <li className="menu__item is-leaf last leaf menu-mlid-3905">
                      <a
                        href="https://giving.cu.edu/guide-giving#additional-options"
                        title=""
                        className="menu__link"
                      >
                        Additional Options
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu__item is-leaf leaf menu-mlid-3906">
                  <a
                    href="https://giving.cu.edu/essentialcu"
                    className="menu__link"
                  >
                    Essential CU
                  </a>
                </li>
                <li className="menu__item is-expanded expanded menu-mlid-3907 menu-item-processed">
                  <a
                    href="https://giving.cu.edu/about-us"
                    className="menu__link"
                  >
                    About Us
                  </a>
                  <ul className="expanded-child">
                    <li className="menu__item is-leaf first leaf menu-mlid-3908">
                      <a
                        href="https://giving.cu.edu/about-us/central-cu-advancement"
                        className="menu__link"
                      >
                        Central CU Advancement
                      </a>
                    </li>
                    <li className="menu__item is-expanded expanded menu-mlid-4536 menu-item-processed">
                      <a
                        href="https://giving.cu.edu/about-us/university-colorado-foundation"
                        className="menu__link"
                      >
                        CU Foundation
                      </a>
                      <ul className="expanded-child">
                        <li className="menu__item is-leaf leaf menu-mlid-4538">
                          <a
                            href="https://giving.cu.edu/about-us/cu-foundation/cu-foundation-leadership"
                            className="menu__link"
                          >
                            Leadership
                          </a>
                        </li>
                        <li className="menu__item is-leaf leaf menu-mlid-4539">
                          <a
                            href="https://giving.cu.edu/about-us/cu-foundation/board-directors"
                            className="menu__link"
                          >
                            Board of Directors
                          </a>
                        </li>
                        <li className="menu__item is-leaf leaf menu-mlid-4540">
                          <a
                            href="https://giving.cu.edu/about-us/cu-foundation/trustees"
                            className="menu__link"
                          >
                            Trustees
                          </a>
                        </li>
                        <li className="menu__item is-leaf leaf menu-mlid-6090">
                          <a
                            href="https://giving.cu.edu/about-us/cu-foundation/cu-foundation-financial-and-investment-documents"
                            className="menu__link"
                          >
                            Financials
                          </a>
                        </li>
                        <li className="menu__item is-leaf leaf menu-mlid-4541">
                          <a
                            href="https://giving.cu.edu/about-us/cu-foundation/cu-foundation-staff-directory"
                            className="menu__link"
                          >
                            Staff Directory
                          </a>
                        </li>
                        <li className="menu__item is-leaf last leaf menu-mlid-4552">
                          <a
                            href="https://giving.cu.edu/about-us/cu-foundation/jobs"
                            className="menu__link"
                          >
                            Jobs
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu__item is-expanded expanded menu-mlid-3909 menu-item-processed">
                      <a
                        href="https://giving.cu.edu/faq"
                        className="menu__link"
                      >
                        FAQ
                      </a>
                      <ul className="expanded-child">
                        <li className="menu__item is-leaf first leaf menu-mlid-3910">
                          <a
                            href="https://giving.cu.edu/faq#category-1203"
                            title=""
                            className="menu__link"
                          >
                            Common Giving Terms
                          </a>
                        </li>
                        <li className="menu__item is-leaf leaf menu-mlid-3911">
                          <a
                            href="/faq#category-1204"
                            title=""
                            className="menu__link"
                          >
                            Ways to Give
                          </a>
                        </li>
                        <li className="menu__item is-leaf last leaf menu-mlid-3912">
                          <a
                            href="/faq#category-1205"
                            title=""
                            className="menu__link"
                          >
                            General Questions About Giving at CU
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu__item is-leaf leaf menu-mlid-3913">
                      <a href="/about-us/contact-us" className="menu__link">
                        Contact Us
                      </a>
                    </li>
                    <li className="menu__item is-collapsed last collapsed menu-mlid-3914">
                      <a href="/about-us/careers" className="menu__link">
                        Careers
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu__item is-active is-active-trail is-leaf last leaf active-trail active menu-mlid-3917 menu-item-button">
                  <Link href="/fund-search">
                    <a className="menu__link is-active-trail active-trail active">
                      Give Now
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
