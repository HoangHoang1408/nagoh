const mongoose = require("mongoose");
const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;
  mongoose
    .connect(process.env.DB_CONNECT_STRING, {})
    .then(() => console.log("Connected to database ..."));
};
module.exports = dbConnect;
