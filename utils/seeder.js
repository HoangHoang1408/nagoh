const Room = require("../models/room");
const rooms = require("../data/roomSeeder");
const dbConnect = require("../config/dbConnect");

dbConnect();
const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Room are deleted!");
    await Room.insertMany(rooms);
    console.log("All rooms are added!");
  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit();
  }
};
seedRooms();
