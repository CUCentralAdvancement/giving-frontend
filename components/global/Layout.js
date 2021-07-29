import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
// import FadeIn from "./FadeIn";

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <main className="flex-grow">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
};
