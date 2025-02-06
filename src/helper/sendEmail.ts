import { resend } from "@/lib/resend";
import { EmailTemplate } from "@/components/email-template";
import { ApiResponse } from "./ApiResponse";

export async function sendEmail(
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> {
  try {
    const emailTemplate = await EmailTemplate({ username, otp: verificationCode, email });
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: emailTemplate,
    });
    return {
      success: true,
      message: "email sent successfully.",
    };
  } catch (error) {
    console.log("Error sending Email .", error);
    return {
      success: false,
      message: "error Sending mail",
    };
  }
}
