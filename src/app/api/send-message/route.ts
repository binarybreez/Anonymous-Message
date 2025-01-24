import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { Message } from "@/models/user.model";

export async function POST(req: Request) {
  await connectDB();
  try {
    const { username, message } = await req.json();
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json({
        status: 404,
        message: "user not found",
        success: false,
      });
    }
    if (!user.isAcceptingMessage) {
      return Response.json({
        status: 403,
        message: "user is not accepting the messages",
        success: false,
      });
    }
    const newMessage = { content: message, createdAt: new Date() };
    console.log(newMessage)
    user.message.push(newMessage as Message);
    await user.save();
    return Response.json({
      status: 201,
      message: "message sent succesfully",
      success: true,
    });
  } catch (error) {
    console.log("server error in sending message : ", error);
    return Response.json({
      status: 500,
      message: "server error in sending the message.",
      success: false,
    });
  }
}
