"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signinSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log("result of sign in", response);
      if (response?.ok) {
        toast({
          title: "Success",
          description: "Sign in Successfull",
        });
        router.push("/dashboard");
      }  else {
        toast({
          title: "Sign up Failed",
          description: response?.error,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.log("Error in signing up of user : ", error);
      toast({
        title: "Signup Failed",
        description: "Signup Failed try again in few moments",
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Username or Email" {...field} />
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
                    "Sign in"
                  )}
                </Button>
                <div className="mt-2">
                  <p>
                    New Here
                    <Link
                      href="/signup"
                      className="text-blue-500 ml-2 hover:text-blue-800"
                    >
                      Sign Up
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
