//MongoDB Connection setup

const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
mongoose.set('useFindAndModify', false);

const connectDB = async () =>
{
  // if fail show error for...
  try 
  {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connnected...");
    
  }
  catch (err) 
  {
    console.error(err.message);
    // Exit process on fail
    process.exit(1);
  }
}

module.exports = connectDB;
