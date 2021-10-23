const mongoose = require("mongoose");
const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;
  mongoose
    .connect(
      "mongodb+srv://hoang:hYvrSfw8QwTZh9xq@cluster0.unoc1.mongodb.net/main?retryWrites=true&w=majority",
      {}
    )
    // .connect(process.env.DB_CONNECT_STRING, {})
    .then(() => console.log("Connected to database ..."));
};
module.exports = dbConnect;
