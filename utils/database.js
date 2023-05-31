import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected){
        console.log("=> using existing database connection");
        return;
    };

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("=> using new database connection"); 
    }
    catch(err){
        console.log("=> error while connecting with database: ", err);
    }


}
