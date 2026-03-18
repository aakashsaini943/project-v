"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import Link from "next/link";
import axios from "axios";

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
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";
import { showToast } from "@/lib/showToast";
import { ToastContainer, toast } from "react-toastify";
import OTPVerification from "@/components/Application/OTPVerification";

const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [OtpVerificationLoading, setOtpVerificationLoading] = useState(false);
  // const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState();

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, "Password must be at least 3 characters"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);

      const { data: registerResponse } = await axios.post(
        "/api/auth/login",
        values,
      );

      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }

      setOtpEmail(values.email);
      form.reset();
      showToast("success", registerResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };


  // otp verification
  const handleOtpVerification = async (values) => {
       try {
      setOtpVerificationLoading(true);

      const { data: registerResponse } = await axios.post(
        "/api/auth/verify-otp",
        values,
      );

      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }

      setOtpEmail("");
      
      showToast("success", registerResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  }

  return (
    <Card className="w-[450px]">
      <CardContent>
        <div className="flex justify-center mb-5">
          <Image
            src={Logo.src}
            alt="Logo"
            width={Logo.height}
            height={Logo.width}
            className="max-w-[150]"
          />
        </div>

        {!otpEmail ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login Into Account </h1>
              <p>Login into your account by filling out the form below </p>
            </div>
            <div>
              <div className="mt-5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
                    <div className="mb-5">
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
                    </div>
                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="*************"
                                {...field}
                              />
                            </FormControl>
                            {/* <button className="absolute mt-0.5  top-1/2 right-2 cursor-pointer" type="button" >
                            {isTypePassword ?
                             <FaRegEyeSlash/>
                             :
                             <FaRegEye/>
                            }
                            </button> */}

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <ButtonLoading
                        loading={loading}
                        type="submit"
                        text="Login"
                        className="w-full bg-purple-700 text-white mt-4 cursor-pointer"
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center  gap-2">
                        <p> Do not have a account </p>
                        <Link
                          href={WEBSITE_REGISTER}
                          className="text-primary underline"
                        >
                          {" "}
                          Create account{" "}
                        </Link>
                      </div>
                      <div>
                        <Link href="" className="text-primary underline">
                          Forgot password
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </>
        ) : (
          <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={OtpVerificationLoading} />
        )}
      </CardContent>
    </Card>
  );
};

export default Loginpage;
