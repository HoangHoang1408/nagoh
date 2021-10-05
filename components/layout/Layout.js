import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

function Layout({ children, title = "BookIT" }) {
  return (
    <div className=" font-urbanist">
      <Head>
        <title>BookIT</title>
        <meta charset="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
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
          crossorigin="anonymous"
        ></script>
      </Head>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
