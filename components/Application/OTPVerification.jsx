import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ButtonLoading from "./ButtonLoading";
import { useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OTPVerification = ({ email, onSubmit, loading }) => {
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handleOtpVerification = async (values) => {
    onsubmit(values)
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          <div className="text-center mt-5 flex justify-center" >
            <h1 className="text-2xl font-bold mb-2" > Please complete verification </h1>
          </div>
          <p className="text-md text-center " > We have sent one time password to your register email address the Otp is valid for 10 minutes</p>
          <div className="mb-5 flex justify-center items-center mt-5">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold" >One time password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} defaultValue="123456">
                      <InputOTPGroup>
                        <InputOTPSlot className="text-xl size-11" index={1} />
                        <InputOTPSlot className="text-xl size-11" index={2} />
                        <InputOTPSlot className="text-xl size-11" index={3} />
                        <InputOTPSlot className="text-xl size-11" index={0} />
                        <InputOTPSlot className="text-xl size-11" index={4} />
                        <InputOTPSlot className="text-xl size-11" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3">
            <ButtonLoading
              loading={loading}
              type="submit"
              text="verify"
              className="w-full bg-purple-700 text-white mt-4 cursor-pointer"
            />
            <div className="text-center mt-5" >
              <button type="button" className="text-purple-700 font-semibold hover:underline cursor-pointer" >Resend otp</button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
