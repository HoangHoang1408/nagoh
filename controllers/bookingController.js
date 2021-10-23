import Booking from "../models/booking";
import catchAsync from "../middlewares/catchAsync";

export const newBooking = catchAsync(async (req, res, next) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;
  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  });
  res.status(200).json({
    success: true,
    booking,
  });
});
export const checkBooking = catchAsync(async (req, res, next) => {
  const { checkInDate, checkOutDate, roomId } = req.body;
  if (new Date(checkInDate) - new Date(checkOutDate) === 0)
    return res.status(200).json({
      status: "success",
      message: "✖ Checkout date must be after checking date",
      isAvailable: false,
    });
  const bookedBookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkOutDate: { $gte: checkInDate },
      },
      {
        checkInDate: { $lte: checkOutDate },
      },
    ],
  });
  let message;
  let isAvailable;
  if (bookedBookings && bookedBookings.length === 0) {
    message = "✔ Room is available on those days";
    isAvailable = true;
  } else {
    message = "✖ Room is not available on those days";
    isAvailable = false;
  }
  res.status(200).json({
    status: "success",
    message,
    isAvailable,
  });
});
export const checkBookedDatesOfRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.query;
  const bookings = await Booking.find({ room: roomId });
  const bookedDates = [];
  const day = 86400 * 1000;
  bookings.forEach((e) => {
    const a = new Date(e.checkInDate).getTime();
    const b = new Date(e.checkOutDate).getTime();
    for (let i = a; i <= b; i += day) bookedDates.push(new Date(i).getTime());
  });
  res.status(200).json({
    success: true,
    bookedDates,
  });
});
export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  res.status(200).json({
    success: true,
    bookings,
  });
});
export const getBookingDetails = catchAsync(async (req, res, next) => {
  console.log("hello", req.query.id);
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  res.status(200).json({
    success: true,
    booking,
  });
});
