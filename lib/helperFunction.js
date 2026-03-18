import { Epilogue } from "next/font/google";
import { NextResponse } from "next/server";

export const response = (success, statuscode, message, data = {}) => {
  return NextResponse.json({
    success,
    statuscode,
    message,
    data,
  });
};

export const catchError = (error, customMessage) => {
  // MongoDB duplicate key error
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Duplicate field: ${keys}. These field value must be unique.`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal server error.",
    };
  }

  return response(false, error.code || 500, errorObj.message, errorObj);
};


export const generateOTP = ()=>{
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  return otp
}