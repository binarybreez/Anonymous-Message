"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/helper/ApiResponse";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function InputOTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof verifySchema>) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/verify-otp", {
        username: params.username,
        code: data.verificationCode,
      });
      if (response.data.success === false) {
        toast({
          title: "Verification Failed",
          description: response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Verification Successfull",
          description: response.data.message,
        });
        router.replace("/login");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed",
        description: axiosError.response?.data.message || "Verification Failed",
        variant: "destructive",
      });
    } finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className="">
      <div
        className=" h-screen flex flex-col antialiased
            bg-black bg-grid-white/[0.2] items-center md:justify-center
            relative overflow-hidden"
      >
        <div className="bg-white rounded-3xl px-4 py-3 text-center w-fit md:mt-0 mt-[200px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-fit space-y-6 "
            >
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl className="bg-black">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="ml-11">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your Email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <Button type="submit">
                {isSubmitting ? (<><Loader2 className="animate-spin" /> Please wait</>) : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
