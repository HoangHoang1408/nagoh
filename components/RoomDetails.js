import {
  faArrowLeft,
  faArrowRight,
  faBed,
  faBroom,
  faCat,
  faEllipsisH,
  faStar,
  faStarHalfAlt,
  faTimes,
  faUsers,
  faUtensils,
  faWifi,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import { toast } from "react-toastify";
import { checkBooking, getBookedDates } from "../redux/actions/bookingAction";
import Link from "next/link";
import {
  createReview,
  deleteReview,
  getRoomReviews,
  updateReview,
} from "../redux/actions/reviewAction";
import { getStripeCheckout } from "../redux/actions/paymentAction";
import { GET_CHECKOUT_RESET } from "../redux/constants/paymentConstants";
import { getStripe } from "../utils/getStripe";

const HeadPage = ({ roomData }) => {
  const roundedRatings = Math.round(2 * roomData.ratings) / 2;
  return (
    <div className="mb-2">
      <h2 className="text-primary font-extrabold uppercase text-lg sm:text-xl md:text-2xl sm:w-4/5 md:w-full mb-3 mt-2">
        2 bedroom Galiyaat view apartment.(one)
      </h2>
      <div className="flex items-center mt-1 space-x-3 mb-2">
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
        <h2 className="text-primary font-bold text-xl">
          {Number(roomData.ratings).toFixed(2)} star rating
        </h2>
      </div>
    </div>
  );
};
const MainImages = ({ src }) => {
  const [current, setCurrent] = useState(0);
  const length = src.length;
  const displayChangePicture = length <= 1 ? " hidden" : "";
  useEffect(() => {
    const timer = setTimeout(() => next(), 5000);
    return () => clearTimeout(timer);
  }, [current]);
  const next = () => {
    if (current === length - 1) return setCurrent(0);
    setCurrent((pre) => pre + 1);
  };
  const prev = () => {
    if (current === 0) return setCurrent(length - 1);
    setCurrent((pre) => pre - 1);
  };
  const imageContainerClass =
    "transition w-full relative h-[20rem] md:h-[29rem]";
  const ImageContainer = (props) => {
    return (
      <div className={props.className}>
        <Image
          src={props.src}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={50}
          placeholder="blur"
          blurDataURL={props.src}
        ></Image>
      </div>
    );
  };
  return (
    <div className="relative col-span-12 md:col-span-7 lg:col-span-8 overflow-hidden select-none">
      <div
        onClick={prev}
        className={
          "absolute top-1/2 left-5 bg-gray-100 opacity-50 rounded-full w-10 h-10 grid place-items-center z-10 hover:scale-110 hover:opacity-80 cursor-pointer transition transform -translate-y-1/2" +
          displayChangePicture
        }
      >
        <FontAwesomeIcon
          className=" text-primary w-2/3 h-2/3"
          icon={faArrowLeft}
        ></FontAwesomeIcon>
      </div>
      <div
        onClick={next}
        className={
          "absolute top-1/2 right-5 bg-gray-100 opacity-50 rounded-full w-10 h-10 grid place-items-center z-10 hover:scale-110 hover:opacity-80 cursor-pointer transition transform -translate-y-1/2" +
          displayChangePicture
        }
      >
        <FontAwesomeIcon
          className=" text-primary w-2/3 h-2/3"
          icon={faArrowRight}
        ></FontAwesomeIcon>
      </div>
      <div className="flex w-full">
        {src.map((e, i) => {
          return (
            <ImageContainer
              key={i}
              src={e.url}
              className={
                i === current
                  ? imageContainerClass
                  : imageContainerClass + " hidden"
              }
            ></ImageContainer>
          );
        })}
      </div>
    </div>
  );
};
const DateTime = ({ state, setState, roomId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { dates } = useSelector((state) => state.bookedDates);
  const id = router.query.id;
  useEffect(() => {
    dispatch(getBookedDates(id));
  }, [dispatch]);
  const onChangeHandler = (item) => {
    const selection = item.selection;
    setState([selection]);
    dispatch(
      checkBooking({
        checkInDate: selection.startDate,
        checkOutDate: selection.endDate,
        roomId: id,
      })
    );
  };
  return (
    <div className="rounded-md overflow-hidden col-span-12 md:col-span-6 lg:col-span-6  border-2 bg-white py-4 space-y-4">
      <h3 className="text-primary text-center font-bold text-2xl">
        Checkin and checkout date:{" "}
      </h3>
      <div className=" rounded w-max m-auto justify-center items-center">
        <DateRange
          className="w-full"
          rangeColors={["#e61e4d"]}
          editableDateInputs={false}
          onChange={onChangeHandler}
          minDate={new Date(Date.now())}
          ranges={state}
          disabledDay={(date) => dates.includes(date.getTime())}
          fixedHeight
        ></DateRange>
      </div>
    </div>
  );
};
const FeatureAndPayment = ({ room, handler, daysOfStay }) => {
  const dispatch = useDispatch();
  const { loading, isAvailable, error, message } = useSelector(
    (state) => state.checkBooking
  );
  const {
    loading: stripeLoading,
    error: stripeError,
    session,
  } = useSelector((state) => state.getStripeCheckout);

  const user = useSelector((state) => state.auth.user);

  useEffect(async () => {
    if (stripeError) {
      toast.error(stripeError);
      dispatch({
        type: GET_CHECKOUT_RESET,
      });
    }
    if (session) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: session.id });
      dispatch({
        type: GET_CHECKOUT_RESET,
      });
    }
  }, [stripeError, session]);
  const {
    pricePerNight,
    guestCapacity,
    numOfBeds,
    internet,
    breakfast,
    petsAllowed,
    airConditioned,
    roomCleaning,
  } = room;
  return (
    <div className="rounded-md overflow-hidden col-span-12 md:col-span-6 lg:col-span-6  border-2">
      <div className="bg-white h-full rounded flex flex-col justify-between">
        <div className="text-gray-700 ">
          <h2 className="text-2xl font-bold px-4 mt-4 mb-6 text-primary">
            Features
          </h2>
          <div className="grid grid-cols-2 gap-x-1 gap-y-5 mb-4">
            {/* Features */}
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faUsers}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {guestCapacity} Guests
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faBed}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {numOfBeds} Beds
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faUtensils}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {breakfast ? "✔" : "✖"} BreakFast
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faWifi}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {internet ? "✔" : "✖"} Internet
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faCat}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {petsAllowed ? "✔" : "✖"} Pet Allowed
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faBroom}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {roomCleaning ? "✔" : "✖"} Cleaning
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FontAwesomeIcon
                icon={faWind}
                className="justify-self-center col-span-1 w-8 h-6 text-primary"
              ></FontAwesomeIcon>
              <h3 className=" col-span-2 text-md font-semibold">
                {airConditioned ? "✔" : "✖"} Air Condition
              </h3>
            </div>
          </div>
        </div>
        <div className="mb-4">
          {isAvailable === undefined && (
            <div className="font-bold px-4 mx-4">
              <h3 className="text-primary">
                Choose your Booking Date in Calendar to continue
              </h3>
            </div>
          )}
          {loading && (
            <div className="font-bold px-4 mx-4 rounded-sm">
              <h3 className="text-primary">Checking your booking...</h3>
            </div>
          )}
          {loading === false && !isAvailable && (
            <div className="font-bold px-4 py-2 bg-red-300 mx-4 rounded-sm">
              <h3 className="text-red-600">{message}</h3>
            </div>
          )}
          {!loading && isAvailable && (
            <div className="font-bold px-4 py-2 bg-green-300 mx-4 rounded-sm">
              <h3 className="text-green-600">{message}</h3>
            </div>
          )}
        </div>
        <div className="md:mt-5">
          <h3 className="text-xl pt-4 pl-1 mb-4 mx-3 border-t-2 border-primary font-semibold">
            Total:{" "}
            <span className="inline-block text-primary font-bold">
              {+daysOfStay * +pricePerNight}$
            </span>{" "}
            with{" "}
            <span className="inline-block text-primary font-bold">
              {pricePerNight}$
            </span>{" "}
            / night
          </h3>
          <button
            disabled={loading || !isAvailable || !user || stripeLoading}
            onClick={handler}
            className="w-full grid place-items-center bg-primary h-14 text-white text-xl hover:text-2xl font-bold cursor-pointer"
          >
            {user && !stripeLoading && <h3 className="">Pay</h3>}
            {stripeLoading && (
              <img className="w-8 h-8" src="/images/loading.svg"></img>
            )}
            {!user && (
              <Link href="/login">
                <h3>Login to booking</h3>
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
const Description = ({ description }) => {
  return (
    <div className="my-10 col-span-12 md:col-span-7 lg:col-span-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-3">
        Description
      </h1>
      <p className="text-lg text-gray-800">{description}</p>
    </div>
  );
};

//
const OtherUserReviews = ({ review }) => {
  const user = review.user;
  return (
    <div className="flex flex-col space-y-2 text-lg shadow-xl bg-white text-gray-800 border-b-2 border-primary rounded-md py-2 px-3">
      <div className="space-y-1">
        <div className="flex justify-center items-center w-max space-x-2">
          <div className="w-8 h-8 relative">
            <Image
              className="rounded-full"
              src={user.avatar.avatarUrl}
              layout="fill"
              objectFit="cover"
              quality={50}
            ></Image>
          </div>
          <div className="text-sm text-primary font-semibold w-max">
            <h3>{user.name}</h3>
            <h3>{new Date(review.createdAt).toLocaleString("en-UK")}</h3>
          </div>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((e) => {
            if (e <= review.rating)
              return (
                <FontAwesomeIcon
                  key={e}
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
              );
            return (
              <FontAwesomeIcon
                key={e}
                className="w-4 text-gray-300"
                icon={faStar}
              ></FontAwesomeIcon>
            );
          })}
        </div>
      </div>
      <div>
        <h2>{review.review}</h2>
      </div>
    </div>
  );
};
const UserHandleFormBox = ({ user, predata, loading, setEditMode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [rating, setRating] = useState(predata?.rating || 0);
  const [reviewText, setReviewText] = useState(predata?.review || "");
  function handleComment(e) {
    e.preventDefault();
    if (reviewText.trim().length === 0)
      return toast.error("You must enter your text to review");
    if (rating === 0) return toast.error("Please give rate to review");
    if (predata) {
      dispatch(
        updateReview({
          reviewId: predata._id,
          room: router.query.id,
          review: reviewText,
          rating,
        })
      );
      setEditMode(false);
      return;
    }
    dispatch(
      createReview({
        room: router.query.id,
        review: reviewText,
        rating,
      })
    );
    setEditMode(false);
    return;
  }
  return (
    <div className="relative flex flex-col space-y-2 text-lg text-gray-800 border-b-2 border-primary rounded-sm pt-1 px-3 ">
      {predata && (
        <div className="absolute top-3 right-3">
          <div
            onClick={() => setEditMode(false)}
            className="w-6 h-6 rounded-full grid place-items-center cursor-pointer bg-gray-100 hover:bg-gray-200"
          >
            <FontAwesomeIcon
              className="text-primary w-4 h-4"
              icon={faTimes}
            ></FontAwesomeIcon>
          </div>
        </div>
      )}
      <div className="space-y-1">
        <div className="flex justify-center items-center w-max space-x-2">
          <div className="w-8 h-8 relative">
            <Image
              className="rounded-full"
              src={user?.avatar.avatarUrl}
              blurDataURL={user?.avatar.avatarUrl}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              quality={50}
            ></Image>
          </div>
          <div className="text-sm text-primary font-semibold w-max">
            <h3>{user?.name}</h3>
          </div>
        </div>
        <div className="flex py-1 cursor-pointer w-max">
          {[1, 2, 3, 4, 5].map((e) => {
            if (e <= rating)
              return (
                <FontAwesomeIcon
                  onClick={() => setRating(e)}
                  className="w-5 text-primary"
                  key={e}
                  icon={faStar}
                ></FontAwesomeIcon>
              );
            return (
              <FontAwesomeIcon
                onClick={() => setRating(e)}
                className="w-5 text-gray-400"
                key={e}
                icon={faStar}
              ></FontAwesomeIcon>
            );
          })}
        </div>
      </div>
      <form onSubmit={handleComment} className="flex items-center space-x-3">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Leave a comment ..."
          className="bg-transparent outline-none resize-none h-auto  border-none w-full no-scrollbar"
        ></textarea>
        <button
          disabled={loading ? true : false}
          className="bg-primary px-3 py-2 text-white text-center cursor-pointer transition transform hover:scale-105 rounded-sm"
        >
          {!loading && <h3>{predata ? "Update" : "Post"}</h3>}
          {loading && <img className="w-8 h-8" src="/images/loading.svg"></img>}
        </button>
      </form>
    </div>
  );
};
const UserReviewBox = ({ userReview, user, setEditMode, setUserReview }) => {
  const router = useRouter();
  const [featureToggle, setFeatureToggle] = useState(false);
  const { error, loading } = useSelector((state) => state.deleteReview);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) toast.error("Delete review fail, try again later!");
  }, [error]);
  const handleDeleteReview = () => {
    dispatch(
      deleteReview({
        roomId: router.query.id,
        reviewId: userReview._id,
      })
    );
    setUserReview(null);
    setEditMode(true);
  };
  return (
    <div className="flex flex-col space-y-3 text-lg text-gray-800 bg-white border-b-2 border-primary rounded-md py-2 px-3 relative">
      <div className="absolute top-3 right-3">
        <div
          onClick={() => setFeatureToggle((pre) => !pre)}
          className="w-6 h-6 rounded-full grid place-items-center cursor-pointer bg-gray-100 hover:bg-gray-200"
        >
          <FontAwesomeIcon
            className="text-primary w-4 h-4"
            icon={faEllipsisH}
          ></FontAwesomeIcon>
        </div>
      </div>
      {featureToggle && (
        <div className="absolute flex flex-col text-sm font-semibold bg-gray-100 top-7 right-3 rounded-md shadow-2xl border-gray-500 px-1 py-1 space-y-1">
          <button
            onClick={() => {
              setEditMode(true);
              setFeatureToggle(false);
            }}
            className="cursor-pointer border-[1px] border-primary text-center px-2 py-1 rounded-md"
          >
            Edit
          </button>
          <button
            disabled={loading ? true : false}
            onClick={handleDeleteReview}
            className="cursor-pointer border-[1px] border-primary text-center px-2 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      )}
      <div className="space-y-1">
        <div className="flex justify-center items-center w-max space-x-2">
          <div className="w-8 h-8 relative">
            <Image
              className="rounded-full"
              src={user.avatar.avatarUrl}
              blurDataURL={user.avatar.avatarUrl}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              quality={50}
            ></Image>
          </div>
          <div className="text-sm text-primary font-semibold w-max">
            <h3>You</h3>
            <h3>{new Date(userReview.createdAt).toLocaleString("en-UK")}</h3>
          </div>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((e) => {
            if (e <= userReview.rating)
              return (
                <FontAwesomeIcon
                  key={e}
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
              );
            return (
              <FontAwesomeIcon
                key={e}
                className="w-4 text-gray-300"
                icon={faStar}
              ></FontAwesomeIcon>
            );
          })}
        </div>
      </div>
      <div>
        <h2>{userReview.review}</h2>
      </div>
    </div>
  );
};
const UserReview = ({ userReview: data, user, roomId }) => {
  const [userReview, setUserReview] = useState(null);
  useEffect(() => {
    if (data) setUserReview(data);
  }, [data]);
  const {
    loading: createLoading,
    error: createReviewError,
    review: createReview,
  } = useSelector((state) => state.createReview);
  const {
    loading: updateLoading,
    error: updateReviewError,
    review: updateReview,
  } = useSelector((state) => state.updateReview);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (createReviewError) toast.error("Post review fail, try again later!");
    if (updateReviewError) toast.error("Update review fail, try again later!");
  }, [createReviewError, updateReviewError]);
  useEffect(() => {
    if (updateReview) setUserReview(updateReview);
  }, [updateReview]);
  useEffect(() => {
    if (createReview && roomId === createReview.room)
      setUserReview(createReview);
  }, [createReview]);
  if (editMode)
    return (
      <UserHandleFormBox
        user={user}
        loading={updateLoading}
        setEditMode={setEditMode}
        predata={userReview}
      ></UserHandleFormBox>
    );
  if (userReview && userReview.room === roomId)
    return (
      <UserReviewBox
        userReview={userReview}
        user={user}
        setEditMode={setEditMode}
        setUserReview={setUserReview}
      ></UserReviewBox>
    );
  return (
    <UserHandleFormBox
      user={user}
      loading={createLoading}
      setEditMode={setEditMode}
    ></UserHandleFormBox>
  );
};
const Reviews = ({ room }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { reviews: data, error } = useSelector((state) => state.roomReviews);
  useEffect(() => {
    dispatch(getRoomReviews(router.query.id, 0));
  }, [dispatch]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (error)
      return toast.error("Can't load comments right now please try later!");
    if (data) setReviews((pre) => pre.concat(data.reviews));
  }, [data, error]);
  function handleLoadMoreReviews() {
    dispatch(getRoomReviews(router.query.id, reviews.length));
  }
  return (
    <div className="col-span-12 md:col-span-7 lg:col-span-8 mb-10">
      <div className="text-lg text-gray-800 rounded-sm">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-5">
          Review
        </h1>
        <div className="flex flex-col space-y-5">
          {/* add comment */}
          {user && (
            <UserReview
              userReview={data?.userReview}
              user={user}
              roomId={room._id}
            ></UserReview>
          )}
          {/* users comments */}
          {reviews?.map((e) => (
            <OtherUserReviews key={e._id} review={e}></OtherUserReviews>
          ))}
        </div>
        {room.numOfReviews > reviews.length + (data?.userReview ? 1 : 0) && (
          <div className="border-2 bg-primary text-white font-bold py-2 text-center mt-4 cursor-pointer">
            <h3 onClick={handleLoadMoreReviews}>Load more ...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

// main
function RoomDetails() {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.roomDetails);

  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const daysOfStay = Math.ceil(
    (new Date(selectedDates[0].endDate) -
      new Date(selectedDates[0].startDate)) /
      86400000
  );
  const newBookingHandler = () => {
    const checkInDate = selectedDates[0].startDate;
    const checkOutDate = selectedDates[0].endDate;
    dispatch(
      getStripeCheckout({
        checkInDate,
        checkOutDate,
        roomId: room._id,
      })
    );
  };
  return (
    <div className="pt-4  px-6 sm:px-10 md:px-10 lg:px-32">
      <HeadPage roomData={room}></HeadPage>
      <MainImages src={room.images}></MainImages>
      <div className="grid gap-4 grid-cols-12 mt-6">
        <DateTime
          state={selectedDates}
          setState={setSelectedDates}
          roomId={room._id}
        ></DateTime>
        <FeatureAndPayment
          handler={newBookingHandler}
          room={room}
          daysOfStay={daysOfStay}
        ></FeatureAndPayment>
        <Description description={room.description}></Description>
        <Reviews room={room}></Reviews>
      </div>
    </div>
  );
}

export default RoomDetails;
