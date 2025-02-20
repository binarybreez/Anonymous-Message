import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/auth";
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  connectDB();
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return Response.json({
      status: 401,
      message: "Invalid access to the resource.",
      success: false,
    });
  }
  try {
    const messageId = new mongoose.Types.ObjectId(id);
    const updatedResult = await UserModel.updateOne(
      { _id: user.id },
      { $pull: { message: { _id: messageId } } },
      { new: true }
    );
    if (updatedResult.modifiedCount === 0) {
      return Response.json({
        status: 404,
        message: "Message not found.",
        success: false,
      });
    }
    return Response.json({
      status: 201,
      message: "Message deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in deleting message", error);
    return Response.json({
      status: 500,
      message: "Server error in deleting message.",
      success: false,
    });
  }
}
