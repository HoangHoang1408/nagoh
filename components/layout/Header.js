import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { signOut } from "next-auth/client";
import Image from "next/image";
import Button from "../UI/Button";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchRooms } from "../../redux/actions/searchAction";

//
function Header() {
  function LeftPart() {
    return (
      <div>
        <Link href="/">
          <img
            src="/images/bookit_logo.png"
            className="cursor-pointer w-20 md:w-32"
          ></img>
        </Link>
      </div>
    );
  }

  const router = useRouter();
  if (router.pathname === "/login")
    return (
      <div className="sticky top-0 left-0 w-full h-14 flex justify-between items-center bg-white shadow-md px-10 z-50">
        <LeftPart></LeftPart>
      </div>
    );
  const [userOption, setUserOption] = useState(false);

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) dispatch(loadUser());
  }, [dispatch, user]);

  async function signOutHandler() {
    await signOut();
    toast.success("Signed Out!");
    window.location.href = "/";
  }

  // const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(null);

  // useEffect(async () => {
  //   if (!user) {
  //     setLoading(true);
  //     const session = await getSession();
  //     setUser(session?.user);
  //     setLoading(false);
  //   }
  // }, [user]);

  function RightPart() {
    return (
      <Fragment>
        {user && !loading && (
          <div className="relative">
            <div
              onClick={() => {
                setUserOption((pre) => !pre);
              }}
              className="flex items-center space-x-2 bg-gray-50 border-[1px] border-gray-200 hover:bg-gray-100 hover:border-primary transform shadow-md py-1 px-2  rounded-full  cursor-pointer"
            >
              <div className="w-10 h-10 relative rounded-full">
                <Image
                  className="rounded-full border-2 border-white"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={user.avatar.avatarUrl}
                  blurDataURL={user.avatar.avatarUrl}
                  placeholder="blur"
                  quality={40}
                ></Image>
              </div>
              <h3 className="text-lg font-semibold text-primary">
                {user.name.split(" ")[0].toUpperCase()}
              </h3>
            </div>
            {userOption && (
              <div className="w-[9rem] font-semibold bg-white absolute right-0 top-full mt-2 rounded-md shadow-md py-2 px-3 flex flex-col space-y-2 text-gray-700">
                {user.role === "admin" && (
                  <div className="space-y-2 border-b-[1px] border-primary pb-2">
                    <h3
                      onClick={() => setUserOption(false)}
                      className=" cursor-pointer text-center text-primary"
                    >
                      Admin
                    </h3>
                    <Link href="/admin/rooms">
                      <h3
                        onClick={() => setUserOption(false)}
                        className=" cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                      >
                        Rooms
                      </h3>
                    </Link>
                    <Link href="/admin/users">
                      <h3
                        onClick={() => setUserOption(false)}
                        className=" cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                      >
                        Users
                      </h3>
                    </Link>
                    <Link href="/admin/bookings">
                      <h3
                        onClick={() => setUserOption(false)}
                        className=" cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                      >
                        Bookings
                      </h3>
                    </Link>
                    <Link href="/admin/reviews">
                      <h3
                        onClick={() => setUserOption(false)}
                        className=" cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                      >
                        Reviews
                      </h3>
                    </Link>
                  </div>
                )}

                <h3
                  onClick={() => {
                    router.push("/me/update");
                    setUserOption(false);
                  }}
                  className=" cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                >
                  Profile
                </h3>
                <Link href="/bookings/me">
                  <h3
                    onClick={() => setUserOption(false)}
                    className=" cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                  >
                    My Bookings
                  </h3>
                </Link>

                <h3
                  onClick={signOutHandler}
                  className="text-red-800 cursor-pointer text-center rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm border-[1px] border-primary py-2"
                >
                  Log out
                </h3>
              </div>
            )}
          </div>
        )}
        {!user && !loading && <Button href="/login">Login</Button>}
      </Fragment>
    );
  }
  function SearchPart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state) => state.searchRooms);
    const [searchText, setSearchText] = useState("");
    const [toggleSearchResults, setToggleSearchResults] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(searchRooms(searchText.trim()));
      }, 1000);
      return () => clearTimeout(timer);
    }, [searchText]);
    useEffect(() => {
      if (error) toast.error(error);
    }, [error]);
    return (
      <div className="relative">
        <div className="bg-gray-200 text-primary font-semibold flex space-x-2 items-center shadow rounded-lg">
          <label
            className="flex space-x-1 items-center bg-primary text-white h-full py-2 pl-3 pr-2 rounded-l-lg"
            htmlFor="search_room"
          >
            <span>
              <FontAwesomeIcon
                className="w4 h-4"
                icon={faSearch}
              ></FontAwesomeIcon>
            </span>
            <h3 className="hidden sm:block">Search</h3>
          </label>
          <input
            onFocus={() => setToggleSearchResults(true)}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="bg-transparent outline-none border-none w-24 text-sm sm:text-base sm:w-56 md:w-72 lg:w-96 font-semibold"
            id="search_room"
          ></input>
        </div>
        {toggleSearchResults && (
          <Fragment>
            <div
              onClick={() => setToggleSearchResults(false)}
              className="fixed top-0 left-0 w-full h-screen bg-transparent"
            ></div>
            <div className="z-50 absolute top-[3.25rem] left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md w-[130%] flex flex-col max-h-[26rem] overflow-y-scroll no-scrollbar min-h-0">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => router.push(`/room/${room._id}`)}
                  className="text-primary font-semibold cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all rounded-md m-1"
                >
                  <div className="flex space-x-4 p-1">
                    <div className="relative w-24 h-16 ">
                      <Image
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-md"
                        layout="fill"
                        src={room.images[0].url}
                        placeholder="blur"
                        blurDataURL={room.images[0].url}
                      ></Image>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3>{room.name}</h3>
                      <h3 className="text-xs ">{room.address}</h3>
                      <h3 className="text-xs">
                        Price:{" "}
                        <span className="font-bold">{room.pricePerNight}$</span>{" "}
                        with <span className="font-bold">{room.ratings}</span>{" "}
                        stars rating (
                        <span className="font-bold">{room.numOfReviews}</span>{" "}
                        reviews)
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
  return (
    <div className="select-none sticky top-0 left-0 w-full h-14 flex justify-between items-center bg-white shadow-md px-4 sm:px-10 z-50">
      <LeftPart></LeftPart>
      <SearchPart></SearchPart>
      <RightPart></RightPart>
    </div>
  );
}

export default Header;
