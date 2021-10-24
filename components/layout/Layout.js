import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout({ children }) {
  return (
    <div className="font-urbanist bg-gray-100">
      <Head>
        <title>Nagoh</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <script
          src="https://kit.fontawesome.com/0d42d6a5fe.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Header></Header>
      <ToastContainer
        autoClose={4000}
        hideProgressBar
        theme="colored"
        position="bottom-right"
      ></ToastContainer>
      <div className="min-h-screen">{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
