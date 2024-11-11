"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

// TODO: add credentials login

const SignInClient = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    setBackgroundImage(
      `https://picsum.photos/1200/800?random=${Math.random()}`
    );
  }, []);

  const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {};
  return (
    <div className="w-full min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
              <BarChart2 className="w-6 h-6 text-blue-700 dark:text-blue-300" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
              Welcome back
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in to your account.
            </p>
          </div>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit as SubmitHandler<FieldValues>
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 rounded-md dark:border-gray-700 dark:bg-gray-800"
                        {...field}
                      />
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
                    <div className="flex items-center justify-between">
                      <FormLabel
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </FormLabel>
                      <Link
                        href="#"
                        className="text-xs text-blue-700 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        disabled
                        id="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-md dark:border-gray-700 dark:bg-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              >
                Sign in
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-blue-700 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={backgroundImage}
          alt="Abstract financial graph"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-blue-900/20 backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Secure. Simple. Smart.</h2>
          <p className="text-sm opacity-80">
            Experience the future of financial management with our premium tools
            and insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInClient;
