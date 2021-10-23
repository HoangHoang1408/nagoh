import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsync from "../middlewares/catchAsync";
import APIFeatures from "../utils/apiFeatures";

// get all room => /api/rooms
export const getAllRooms = catchAsync(async (req, res, next) => {
  const resPerPage = 4;
  const roomsCount = await Room.find().count();
  const filteredRoomsCount = await new APIFeatures(Room.find(), req.query)
    .search()
    .filter()
    .count().query;
  const apiFeatures = new APIFeatures(Room.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  const rooms = await apiFeatures.query;
  res.status(200).json({
    success: true,
    roomsCount,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// get room by id => api/rooms/:id
export const getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) return next(new ErrorHandler("Room not found!", 400));
  res.status(200).json({
    success: true,
    room,
  });
});

// create a room => /api/rooms
export const newRoom = catchAsync(async (req, res, next) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    success: true,
    room,
  });
});

// Update room details => api/rooms/:id
export const updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!room) return next(new ErrorHandler("No room found with that id", 400));
  res.status(200).json({
    success: true,
    room,
  });
});

// delete room details => api/rooms/:id
export const deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) return next(new ErrorHandler("No room found with that id!", 400));
  room.remove();
  res.status(204).send();
});

export const textSearchRooms = catchAsync(async (req, res, next) => {
  console.log(req.body.text, "hello");
  const rooms = await Room.find({ $text: { $search: req.body.text } });
  res.status(200).json({
    success: true,
    rooms,
  });
});
