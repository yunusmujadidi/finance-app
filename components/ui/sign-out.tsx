"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./button";

const SignOut = () => {
  return <Button onClick={() => signOut()}>SignOut</Button>;
};

export default SignOut;
