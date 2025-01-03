    // There always be the chance of error in database
    import mongoose from 'mongoose';
    import  {DB_NAME} from "../constant.js"  // doubles dot refers to the parent directory

    // connect db
    const connectDb = async () => {
        try {
            // const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI} / ${DB_NAME}`)
            const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
            console.log("Mongo DB connected" + `${connectionInstance.connection.host}`);
            
        } catch (error) {

            console.log("Connection Failed first");
            process.exit(1)

        }
    } 

    export default connectDb;