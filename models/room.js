const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room name required!"],
      trim: true,
      maxlength: [100, "Room name can't exceed 100 characters"],
      unique: [true, "Room name must be unique"],
    },
    address: {
      type: String,
      required: [true, "Room address required!"],
      maxlength: [100, "Room address can't exceed 100 characters"],
      unique: [true, "Room address must be unique"],
    },
    description: {
      type: String,
      required: [true, "Room description required!"],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Room price required!"],
      maxlength: [4, "Room price can't exceed 4 characters"],
      default: 0.0,
    },
    guestCapacity: {
      type: Number,
      required: [true, "Guest Capacity required!"],
      min: [0, "Guest Capacity must greater than or equal to 0."],
    },
    numOfBeds: {
      type: Number,
      required: [true, "Require the number of bed in room!"],
    },
    internet: {
      type: Boolean,
      required: false,
    },
    breakfast: {
      type: Boolean,
      required: false,
    },
    petsAllowed: {
      type: Boolean,
      required: false,
    },
    airConditioned: {
      type: Boolean,
      required: false,
    },
    roomCleaning: {
      type: Boolean,
      required: false,
    },
    ratings: {
      type: Number,
      default: 5,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Category of the room required!"],
      enum: {
        values: ["King", "Single", "Twins"],
        message: "Please select correct category for the room!",
      },
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
roomSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "room",
});
roomSchema.index({
  name: "text",
  address: "text",
  description: "text",
});
module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
