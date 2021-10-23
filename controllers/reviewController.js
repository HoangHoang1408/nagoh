import Room from "../models/room";
import Review from "../models/review";
import catchAsync from "../middlewares/catchAsync";
import mongoose from "mongoose";

export const createReview = catchAsync(async (req, res, next) => {
  const { room: roomId, review, rating } = req.body;
  const userId = req.user._id;
  const data = await Review.create({
    room: roomId,
    user: userId,
    review,
    rating,
  });
  const stats = await Review.aggregate([
    { $match: { room: mongoose.Types.ObjectId(roomId) } },
    {
      $group: {
        _id: null,
        numOfReviews: { $sum: 1 },
        ratingAvg: { $avg: "$rating" },
      },
    },
  ]);
  const room = await Room.findById(roomId);
  room.ratings = stats[0].ratingAvg;
  room.numOfReviews = stats[0].numOfReviews;
  await room.save();
  res.status(201).json({
    success: true,
    review: data,
  });
});
export const updateReview = catchAsync(async (req, res, next) => {
  const { room: roomId, review, rating, reviewId } = req.body;
  const data = await Review.findByIdAndUpdate(
    reviewId,
    {
      room: roomId,
      review,
      rating,
      createdAt: Date.now(),
    },
    { new: true, runValidators: true }
  );
  const stats = await Review.aggregate([
    { $match: { room: mongoose.Types.ObjectId(roomId) } },
    {
      $group: {
        _id: null,
        numOfReviews: { $sum: 1 },
        ratingAvg: { $avg: "$rating" },
      },
    },
  ]);
  const room = await Room.findById(roomId);
  room.ratings = stats[0].ratingAvg;
  room.numOfReviews = stats[0].numOfReviews;
  await room.save();
  res.status(201).json({
    success: true,
    review: data,
  });
});
export const deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId, roomId } = req.body;
  await Review.findByIdAndDelete(reviewId);
  const stats = await Review.aggregate([
    { $match: { room: mongoose.Types.ObjectId(roomId) } },
    {
      $group: {
        _id: null,
        numOfReviews: { $sum: 1 },
        ratingAvg: { $avg: "$rating" },
      },
    },
  ]);
  const room = await Room.findById(roomId);
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
export const getRoomReviews = catchAsync(async (req, res, next) => {
  const { skip, userId } = req.body;
  const reviews = await Review.find({
    room: req.query.id,
    user: { $ne: userId },
  })
    .skip(skip)
    .limit(process.env.NUMBER_OF_REVIEWS_DISPLAYED_ON_ROOM_PAGE)
    .populate({
      path: "user",
      select: "name avatar",
    });
  const userReview = await Review.findOne({
    user: userId,
    room: req.query.id,
  }).populate({
    path: "user",
    select: "name avatar",
  });
  res.status(200).json({
    success: true,
    reviews: {
      reviews,
      results: reviews.length,
      userReview,
    },
  });
});
