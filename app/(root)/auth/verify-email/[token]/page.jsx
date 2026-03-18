"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import axios from "axios";
import verifiedImg from "@/public/assets/images/verified.gif";
import verificationFailedImg from "@/public/assets/images/verification-failed.gif";
import { Button } from "@/components/ui/button";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: verificationResponse } = await axios.post(
          "/api/auth/verify-email",
          { token }
        );

        if (verificationResponse.success) {
          setIsVerified(true);
        }
      } catch (error) {
        setIsVerified(false);
      }
    };

    verify();
  }, [token]);

  return (
    <Card className="w-[400px]">
      <CardContent>
        {isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verifiedImg}
                height={verifiedImg.height}
                width={verifiedImg.width}
                className="h-[100px] w-auto"
                alt="Email verification successful"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-500 my-5">
                Email verification success
              </h1>

              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verificationFailedImg}
                height={verificationFailedImg.height}
                width={verificationFailedImg.width}
                className="h-[100px] w-auto"
                alt="Email verification failed"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500 my-5">
                Email verification Failed
              </h1>

              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;