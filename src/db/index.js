  // There always be the chance of error in database
  import mongoose from "mongoose";

  // connect db
  const connectDb = async () => {
    try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
      console.log("Mongo DB connected " + connectionInstance.connection.host);
    } catch (error) {
      console.log("Mongo DB Connection Error, coming from Db folder:", error);
      process.exit(1);
    }
  };

  export default connectDb;
