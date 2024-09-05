const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected correctly ✅");
    
  } catch (error) {
    console.log("Error connecting to DB 🙃");
  }
};

module.exports = { connectDB };