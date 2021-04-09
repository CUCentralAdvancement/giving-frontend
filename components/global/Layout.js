import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
// import FadeIn from "./FadeIn";

const Layout = ({children}) => {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
