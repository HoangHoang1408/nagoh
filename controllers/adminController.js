import mongoose from 'mongoose';
import catchAsync from '../middlewares/catchAsync';
import {
  deleteFromStorage,
  uploadToStorageRoomImage,
} from '../firebase/firebase';
import Room from '../models/room';
import Review from '../models/review';
import Booking from '../models/booking';
import User from '../models/user';

export const getAdminRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json({
    success: true,
    rooms,
  });
});
export const getAdminRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  res.status(200).json({
    success: true,
    room,
  });
});
export const updateAdminRoom = catchAsync(async (req, res, next) => {
  if (req.files.length > 0)
    req.body['images'] = await Promise.all(
      req.files.map((file) => uploadToStorageRoomImage('roomImages', file))
    );
  const room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    runValidators: true,
  });
  if (req.files.length > 0)
    await Promise.all(
      room.images.map((image) => deleteFromStorage(image.public_id))
    );
  res.status(200).json({
    success: true,
  });
});
export const deleteAdminRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.query.id);
  await Promise.all(
    room.images.map((image) => deleteFromStorage(image.public_id))
  );
  await Booking.deleteMany({
    room: req.query.id,
  });
  await Review.deleteMany({
    room: req.query.id,
  });
  res.status(200).json({
    success: true,
  });
});
export const adminCreateRoom = catchAsync(async (req, res, next) => {
  const images = await Promise.all(
    req.files.map((file) => uploadToStorageRoomImage('roomImages', file))
  );
  const roomObject = { ...req.body, images };
  const room = await Room.create(roomObject);
  res.status(200).json({
    success: true,
    room,
  });
});
export const adminGetBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });
  res.status(200).json({
    success: true,
    bookings,
  });
});
export const adminDeleteBooking = catchAsync(async (req, res, next) => {
  await Booking.findByIdAndDelete(req.query.id);
  res.status(200).json({
    success: true,
  });
});
export const adminDeleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.query.id);
  const stats = await Review.aggregate([
    { $match: { room: mongoose.Types.ObjectId(review.room) } },
    {
      $group: {
        _id: null,
        numOfReviews: { $sum: 1 },
        ratingAvg: { $avg: '$rating' },
      },
    },
  ]);
  const room = await Room.findById(review.room);
  if (stats.length === 0) {
    room.ratings = 5;
    room.numOfReviews = 0;
  } else {
    room.ratings = stats[0].ratingAvg;
    room.numOfReviews = stats[0].numOfReviews;
  }
  await room.save();
  res.status(200).json({
    success: true,
  });
});
export const adminGetReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().populate({
    path: 'user',
    select: 'name email avatar _id',
  });
  res.status(200).json({
    success: true,
    reviews,
  });
});
export const adminDeleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.query.id);
  await deleteFromStorage(user.avatar.fullPath);
  res.status(200).json({
    success: true,
  });
});
export const adminGetUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
