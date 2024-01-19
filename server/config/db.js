const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.log("Database error", error);
  }
};

module.exports = connectDb;
