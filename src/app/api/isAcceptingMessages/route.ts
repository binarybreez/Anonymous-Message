import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { User } from "next-auth";

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!user) {
    return Response.json({
      status: 401,
      message: "Invalid access to the resource.",
      success: false,
    });
  }
  const userId = user._id;
  const { acceptingMessage } = await req.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptingMessage },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json({
        status: 404,
        message: "User not found",
        success: false,
      });
    }
    return Response.json({
      status: 201,
      message: "Message prefference updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(
      "An error occured in changing the message prefference of the user : ",
      error
    );
    return Response.json({
      status: 500,
      message: "Server Erro in changing the preference of the user",
      success: false,
    });
  }
}

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json({
        status: 404,
        message: "user not found",
        success: false,
      });
    }
    return Response.json({
      status: 201,
      data: foundUser.isAcceptingMessage,
      message: "Got the message state of the user",
      success: true,
    });
  } catch (error) {
    console.log("Error getting the current of the user : ", error);
    return Response.json({
      status: 500,
      message: "Server Error in getting the current of the user.",
      success: false,
    });
  }
}
