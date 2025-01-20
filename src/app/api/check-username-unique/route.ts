import connectDB from "@/lib/connectDB";
import { usernameValidate } from "@/schemas/signupSchema";
import { z } from "zod";
import UserModel from "@/models/user.model";

const usernameQuerySchema = z.object({
  username: usernameValidate,
});

export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = usernameQuerySchema.safeParse(queryParam);
    console.log(result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        status: 400,
        message:
          usernameErrors?.length > 0
            ? usernameErrors.join(",")
            : "Invalid Username",
        success: false,
      });
    }

    console.log(result.data);
    const { username } = result.data;

    const existingUser = await UserModel.findOne(
      { username },
      { isVerified: true }
    );

    if (existingUser) {
      return Response.json({
        success: false,
        message: "username already taken",
        status: 400,
      });
    }

    return Response.json({
      success: true,
      message: "Username available",
      status: 201,
    });
  } catch (error) {
    console.log("error checking the username : ", error);
    return Response.json({
      status: 500,
      message: "Error occured while checkigng the username",
      success: false,
    });
  }
}
