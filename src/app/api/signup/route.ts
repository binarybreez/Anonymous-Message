import connnectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/sendEmail";

export async function POST(request: Request) {
  await connnectDB();
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  try {
    const { username, email, password } = await request.json();
    const existingUserbyUsername = await UserModel.findOne({ $or : [{email}, {username}] });
    if (existingUserbyUsername) {
      return Response.json({
        success: false,
        message: "user with this username or email already exists",
        status: 400,
      });
    }
    const existingUserbyEmail = await UserModel.findOne({ email });
    if (existingUserbyEmail) {
      if (existingUserbyEmail.isVerified) {
        return Response.json({
          success: false,
          message: "a user already exists with this email and is verified.",
          status: 400,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserbyEmail.password = hashedPassword;
        existingUserbyEmail.verificationCode = verificationCode;
        existingUserbyEmail.verificationCodeExpiry = new Date(
          Date.now() + 3600000
        );
        await existingUserbyEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      await new UserModel({
        email,
        username,
        password: hashedPassword,
        verificationCode,
        verificationCodeExpiry: expiryDate,
      }).save();
    }

    const emailResponse = await sendEmail(email, username, verificationCode);
    if (!emailResponse.success) {
      return Response.json({
        success: false,
        message: emailResponse.message,
        status: 500,
      });
    }

    return Response.json({
      status: 200,
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log("Error creating user : ", error);
    return Response.json(
      {
        success: false,
        message: "Error creating user.",
      },
      {
        status: 500,
      }
    );
  }
}
