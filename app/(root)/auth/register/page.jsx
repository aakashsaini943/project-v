"use client";

import React, { useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { z } from "zod";

import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const RegisterPage = () => {

  const [loading, setLoading] = useState(false);

  const formSchema = zSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must be same",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
    try {

      setLoading(true);

      const { data: registerResponse } = await axios.post(
        "/api/auth/register",
        values
      );

      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }

      form.reset();
      alert(registerResponse.message);

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <Card className="w-[450px]">

      <CardContent>

        {/* Logo */}

        <div className="flex justify-center mb-5">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            className="max-w-[150px]"
          />
        </div>

        {/* Heading */}

        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p>Create new account by filling out the form below</p>
        </div>

        <div className="mt-5">

          <Form {...form}>

            <form
              onSubmit={form.handleSubmit(handleRegisterSubmit)}
              className="space-y-4"
            >

              {/* Name */}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>Full Name</FormLabel>

                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

              {/* Email */}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

              {/* Password */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*************"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

              {/* Confirm Password */}

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*************"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

              {/* Button */}

              <ButtonLoading
                loading={loading}
                type="submit"
                text="Create Account"
                className="w-full bg-purple-700 text-white mt-4 cursor-pointer"
              />

              {/* Login */}

              <div className="text-center flex justify-center items-center gap-2">

                <p>Already have account?</p>

                <Link
                  href={WEBSITE_LOGIN}
                  className="text-primary underline"
                >
                  Login
                </Link>

              </div>

            </form>

          </Form>

        </div>

      </CardContent>

    </Card>
  );
};

export default RegisterPage;