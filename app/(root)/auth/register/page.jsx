"use client";
import React from 'react'

import { Card, CardContent } from "@/components/ui/card";
import  { useState } from "react";
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
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  // const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      name: true,  email: true, password: true, 
    }).extend({
      confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
      message: ' Password and confirm password must be same',
      path: ['confirmPassword']
    })
 

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (value) => {};

  return (
    <Card className="w-[450]">
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
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create  Account </h1>
          <p> Create new account by filling out the form below </p>
        </div>
        <div>
          <div className="mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name "
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
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="Confirmpassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel> Confirm Password</FormLabel>
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
                    text="Create Account"
                    className="w-full bg-purple-700 text-white mt-4 cursor-pointer"
                  />
                </div>
                <div className="text-center"> 
                  <div className="flex justify-center items-center  gap-2">
                    <p> Already have account ?</p>
                    <Link href={WEBSITE_LOGIN} className="text-primary underline"> Login </Link>
                  </div>
               
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage