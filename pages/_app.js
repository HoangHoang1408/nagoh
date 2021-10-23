import "tailwindcss/tailwind.css";
import Layout from "../components/layout/Layout";
import { wrapper } from "../redux/store";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
