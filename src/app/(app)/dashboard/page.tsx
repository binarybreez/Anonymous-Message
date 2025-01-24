"use client";

import Copysection from "@/components/dashboard/Copysection";
import Navbar from "@/components/dashboard/Navbar";
import { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/user.model";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/helper/ApiResponse";
import { User } from "next-auth";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);

  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessage = watch("acceptMessage");

  const fetchAcceptMessage = useCallback(async () => {
    setSwitchLoading(true);
    try {
      const response = await axios.get("/api/isAcceptingMessages");
      setValue("acceptMessage", response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed in fetching messaging state",
        variant: "destructive",
      });
    } finally {
      setSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessage = useCallback(
    async (refresh: boolean = false) => {
      setIsSubmitting(true);
      setSwitchLoading(true);
      try {
        const response = await axios.get("/api/get-messages");
        setMessages(response.data.message || []);
        if (refresh) {
          toast({
            title: "Success",
            description: "Messages Refreshed Successfully",
          });
        }
        toast({
          title: "Success",
          description: response.data.message,
        });
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed in accepting messages",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
        setSwitchLoading(false);
      }
    },
    [setIsSubmitting, setMessages, toast]
  );

  useEffect(() => {
    if (!session || !session?.user) return;
    fetchMessage();
    fetchAcceptMessage();
  }, [session, fetchMessage, fetchAcceptMessage, setValue]);

  const handleSwitchChange = async () => {
    setSwitchLoading(true);
    try {
      const response = await axios.post("/api/isAcceptingMessages", {
        acceptingMessage: !acceptMessage,
      });
      fetchAcceptMessage();
      toast({
        title: "Success",
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed in accepting messages",
        variant: "destructive",
      });
    } finally {
      setSwitchLoading(false);
    }
  };
  if (!session || !session?.user) {
    return <div className="text-2xl font-bold">Please Login</div>;
  }

  const { username } = session?.user as User;
  const baseURL = `${window.location.protocol}//${window.location.host}`;
  const profileURL = `${baseURL}/users/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileURL);
    toast({
      title: "Success",
      description: "Copied to clipboard",
    });
  };

  return (
    <div
      className="items-center w-screen h-fit  flex flex-col antialiased
            bg-black bg-grid-white/[0.2] justify-center
            relative overflow-hidden"
    >
      <div className="flex w-full justify-center sticky top-2">
        <Navbar username={username} />
      </div>
      <div className="mt-3 py-2 border-none  text-xl  w-full flex items-center justify-center font-semibold">
        <h1 className="bg-transparent text-white">User Dashboard</h1>
      </div>
      <div className="w-full mt-5">
        <Copysection profileURL={profileURL} buttonFunction={copyToClipboard} />
      </div>
      <div className="flex w-fit gap-2 bg-white rounded-md p-2">
        <Switch
          {...register("acceptMessage")}
          onCheckedChange={handleSwitchChange}
          checked={acceptMessage}
          disabled={switchLoading}
        />
        {isSubmitting && <Loader2 className="animate-spin" />}
      </div>
      <div className="">
        {Array.isArray(messages) && messages.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ) : (
          <p>No Messages to display</p>
        )}
      </div>
    </div>
  );
}
