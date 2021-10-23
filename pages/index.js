import { wrapper } from "../redux/store";
import { getAllRooms } from "../redux/actions/roomAction";
import Home from "../components/Home";

//
export default function HomePage() {
  return <Home></Home>;
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(getAllRooms(req, query));
    }
);
