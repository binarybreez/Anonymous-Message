import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export default async function connectDB(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to the database using the existing connection.")
        return
    }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log("Database connected.");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Error connecting the database : ", error);
    process.exit(1);
  }
}
