import { useSelector } from "react-redux";
import {
  faArrowLeft,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./UI/Pagination";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
//
function RoomCard({ room }) {
  const roundedRatings = Math.round(2 * room.ratings) / 2;
  return (
    <div className="rounded-md   overflow-hidden lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 flex flex-col justify-between space-y-2 shadow-2xl bg-white">
      <div className="overflow-hidden">
        <Image
          className="object-cover object-center"
          layout="responsive"
          width={400}
          height={300}
          src={room.images[0].url}
          blurDataURL={room.images[0].url}
          placeholder="blur"
          quality={25}
        ></Image>
      </div>
      <h2 className="px-3 text-gray-800 text-lg font-bold h-20 mt-2">
        {room.name}
      </h2>
      <div className="px-3">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {room.pricePerNight}$ / night
        </h3>
        <div className="flex h-8  justify-between items-center pr-4">
          <div className="space-x-1 flex">
            {[1, 2, 3, 4, 5].map((e) => {
              if (e <= roundedRatings)
                return (
                  <FontAwesomeIcon
                    className="w-5 text-primary"
                    key={e}
                    icon={faStar}
                  ></FontAwesomeIcon>
                );
              if (e - roundedRatings === 0.5)
                return (
                  <FontAwesomeIcon
                    className="w-5 text-primary"
                    key={e}
                    icon={faStarHalfAlt}
                  ></FontAwesomeIcon>
                );
              return <div key={e}></div>;
            })}
          </div>
          <h2 className="text-primary font-bold">
            {room.numOfReviews} reviews
          </h2>
        </div>
      </div>
      <Link href={`/room/${room._id}`}>
        <div className="w-full py-2  bg-primary cursor-pointer">
          <h3 className="text-white text-lg text-center font-mediumbg-transparent hover:scale-110 transform">
            View Details
          </h3>
        </div>
      </Link>
    </div>
  );
}
function Home() {
  const router = useRouter();
  const allRoomsData = useSelector((state) => state.allRooms);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) toast.success(`Welcome ${user.name.split(" ")[0].toUpperCase()}`);
  }, [user]);

  const rooms = allRoomsData.rooms;
  const roomCards =
    rooms && rooms.length === 0 ? (
      <h3 className="text-center text-3xl text-primary font-semibold col-span-12">
        No rooms found!
      </h3>
    ) : (
      rooms.map((e) => <RoomCard room={e} key={e._id}></RoomCard>)
    );

  //
  return (
    <div className="pt-10 min-h-screen bg-gray-100">
      <div className="w-full px-5 sm:px-10 md:px-20 lg:px-28">
        <h3 className="text-3xl font-bold text-primary">Select your room</h3>
        {/* Cards container */}
        <div className="grid gap-5 grid-cols-12 mt-8 ">
          {roomCards}
          {!rooms && (
            <div>
              Some things went wrong <br></br>
              Please comeback later!
            </div>
          )}
        </div>
        {allRoomsData.resPerPage < allRoomsData.roomsCount && (
          <Pagination
            query={router.query}
            itemsPerPage={allRoomsData.resPerPage}
            totalItems={allRoomsData.filteredRoomsCount}
            href={""}
          ></Pagination>
        )}
      </div>
    </div>
  );
}

export default Home;
