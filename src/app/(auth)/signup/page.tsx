"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/schemas/signupSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/helper/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";

export default function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const checkUsername = async () => {
    if (username) {
      setIsCheckingUsername(true);
      setUsernameMessage("");
      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${username}`
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ||
            "An Error occured checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    }
  };

  useEffect(() => {
    checkUsername();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/signup", data);
      if(response.data.success === false) {
        toast({
          title: "Sign up Failed",
          description: response.data.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.replace(`/verify/${username}`);
      }
      
    } catch (error) {
      console.log("Error in signing up of user : ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup Failed",
        description: errorMessage || "Signup Failed try again in few moments",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <div
        className="h-full w-full flex flex-col antialiased  bg-black 
        bg-grid-white/[0.05] relative overflow-hidden items-center"
      >
        <h1 className="text-4xl font-semibold md:font-bold mb-7 mt-10 text-center text-white">
          Anonymous Feedback Platform
        </h1>
        <div
          className="w-[90%] sm:w-[60%]  md:w-[40%] rounded-3xl border-2 border-zinc-400 text-white
         bg-gradient-to-tl from-black via-zinc-950 to-zinc-800 px-9 py-7 text-lg"
        >
          <h1 className="text-[22px] font-semibold mb-5 text-center w-full">
            Sign up to start your anonymous adventure
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:justify-between md:flex-row flex-col justify-center items-center">
                <Button type="submit" variant={"secondary"}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                      wait
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
                <div className="mt-2">
                  <p>
                    Already a member ?
                    <Link
                      href="/login"
                      className="text-blue-500 ml-2 hover:text-blue-800"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
