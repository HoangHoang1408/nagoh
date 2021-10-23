import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { adminGetBooking } from "../../../redux/actions/adminAction";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";

function BookingDetailsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) dispatch(adminGetBooking(router.query.id));
  }, [router.query]);
  const {
    booking: data,
    loading,
    error,
  } = useSelector((state) => state.adminGetBooking);
  const [booking, setBooking] = useState({
    user: { name: "" },
    room: { images: [{ url: "/images/loading.svg" }] },
    _id: null,
    checkInDate: null,
    checkOutDate: null,
    daysOfStay: null,
    amountPaid: null,
    paymentInfo: {},
  });
  useEffect(() => {
    if (error) toast.error("Load booking fail!");
    if (data) setBooking(data);
  }, [error, data]);
  if (loading)
    return (
      <div className="mt-20 flex justify-center">
        <img className="w-10 h-10" src="/images/loading.svg"></img>
      </div>
    );
  return (
    <div className="mt-10 lg:ml-20">
      <div className="w-max">
        <h3 className="mb-4 font-extrabold text-primary text-3xl">{`Booking #${booking._id}`}</h3>
        <div className="space-y-10">
          <div className="border-b-[1px] border-primary pb-2">
            <h3 className="mb-2 font-bold text-primary text-2xl">User Info</h3>
            <div className="font-semibold ml-4">
              <h3>
                <span className="text-primary">Name: </span>
                {booking.user.name.toUpperCase()}
              </h3>
              <h3>
                <span className="text-primary">Email: </span>
                {booking.user.email}
              </h3>
            </div>
          </div>
          <div className="border-b-[1px] border-primary pb-2">
            <h3 className="mb-2 font-bold text-primary text-2xl">
              Booking Info
            </h3>
            <div className="font-semibold ml-4">
              <h3>
                <span className="text-primary">Check In: </span>
                {new Date(booking.checkInDate).toLocaleString("en-UK", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </h3>
              <h3>
                <span className="text-primary">Check Out: </span>
                {new Date(booking.checkOutDate).toLocaleString("en-UK", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </h3>
              <h3>
                <span className="text-primary">Days of stay: </span>
                {booking.daysOfStay} days
              </h3>
            </div>
          </div>
          <div className="border-b-[1px] border-primary pb-2">
            <h3 className="mb-2 font-bold text-primary text-2xl">
              Payment Status
            </h3>
            <div className="font-bold ml-4 text-green-700">
              {booking.paymentInfo.status}
            </div>
          </div>
          <div className="border-b-[1px] border-primary pb-2">
            <h3 className="mb-4 font-bold text-primary text-2xl">
              Booked Room
            </h3>
            <div className="font-bold ml-4 flex justify-between items-center space-x-6 text-primary mr-4">
              <div className="relative w-20 h-12">
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={booking.room.images[0].url}
                  quality={40}
                ></Image>
              </div>
              <h3
                onClick={() => router.push(`/room/${booking.room._id}`)}
                className="cursor-pointer hover:underline font-bold text-blue-600 text-lg"
              >
                {booking.room.name}
              </h3>
              <h3>{booking.daysOfStay} Days</h3>
              <h3>$ {booking.amountPaid}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsPage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.role !== "admin")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
