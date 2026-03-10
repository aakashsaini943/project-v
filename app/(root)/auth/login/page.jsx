"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
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
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";

const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  // const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, "Password must be at least 3 characters")
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (value) => {
    console.log(value)
  };

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
                    <Link href={WEBSITE_REGISTER} className="text-primary underline"> Create account  </Link>
                  </div>
                  <div>
                    <Link href="" className="text-primary underline">Forgot password</Link>
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

export default Loginpage;
