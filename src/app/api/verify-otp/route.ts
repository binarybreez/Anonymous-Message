import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";

export async function POST(req: Request) {
  await connectDB();
  try {
    const { username, code } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json({
        status: 404,
        message: "user not found",
        success: false,
      });
    }
    const isCodeValid = user.verificationCode === code;
    const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json({
        status: 201,
        message: "User Verified",
        success: true,
      });
    } else if (!isCodeNotExpired) {
      return Response.json({
        status: 400,
        message: "Verification OTP Expired",
        success: false,
      });
    } else {
      return Response.json({
        status: 400,
        message: "Invalid Verification OTP",
        success: false,
      });
    }
  } catch (error) {
    console.log("An Error occured in otp Verification", error);
    return Response.json({
      status: 500,
      message: "server error in verifying otp",
      success: false,
    });
  }
}
