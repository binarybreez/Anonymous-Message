import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/auth";

export async function GET(){
    await connectDB();
    const session = await getServerSession(authOptions);
    const user  = session?.user;
    if(!user){
        return Response.json({
            status: 401,
            message: "Invalid access to the resource.",
            success:false
        })
    }
    const userId = new mongoose.Types.ObjectId(user.id);
    try {
        const user = await UserModel.aggregate([
            {$match: {_id: userId}},
            {$unwind: "$message"},
            {$sort: {"message.createdAt": -1}},
            {$group: {_id: "$_id", message: {$push: "$message"}}},
        ])
        if(!user[0]){
            return Response.json({
                status: 404,
                message: "No Message Found",
                success: false
            })
        }
        console.log(user[0].message)
        return Response.json({
            status: 201,
            data: user[0].message,
            success: true
        })
    } catch (error) {
        console.log("An error occured while fectching the messages : ", error)
        return Response.json({
            status: 500,
            message: "Server Error in fectcing the messsages",
            success: false,
        })
    }

}