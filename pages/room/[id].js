import RoomDetails from "../../components/RoomDetails";
import { getRoomDetails } from "../../redux/actions/roomAction";
import { wrapper } from "../../redux/store";

export default function RoomDetailPage() {
  return <RoomDetails></RoomDetails>;
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
