"use client";
import Input from "@/components/re-components/Input";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Router } from "react-router-dom";
import { FaGooglePlusG, FaGithub } from "react-icons/fa";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState(true);

  // thuc ra khong can dung useCallback o cho nay
  const toggleVariant = () => {
    // console.log("hceck variant");

    setVariant((variant) => {
      return !variant;
    });
  };

  // const toggleVariant = useMemo(() => {
  //   console.log("check memo");

  //   return () => setVariant((variant) => !variant);
  // }, []);
  const login = async (provider: string) => {
    try {
      await signIn(provider, {
        email,
        password,
        redirect: true,
        callbackUrl: "/layout/home",
      });
      // router.push("/layout/home");
    } catch (error) {
      console.log("check err", error);
    }
  };

  const register = useCallback(async () => {
    console.log("hceck red");

    try {
      await axios.post("/api/register", {
        email,
        userName,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, userName, password]);
  const router = useRouter();
  return (
    <div className="bg-[url('/blackcat.jpg')] bg-cover bg-center bg-no-repeat w-full h-screen relative">
      <div className=" bg-gradient-to-b from-transparent to-black opacity-95 absolute top-0 bottom-0 right-0 left-0 "></div>
      <div className="flex justify-center items-center h-full ">
        <div className="bg-black bg-opacity-70 px-8 py-8  self-center mt-2  sm:max-w-md rounded-md w-[22rem] sm:w-[24rem]">
          <h2 className="text-white text-2xl font-semibold mb-5">
            {/* <>{console.log("check")}</> */}
            {variant ? "Sign In" : "Register"}
          </h2>
          <div className="flex flex-col gap-4 sm:gap-6">
            {variant ? (
              ""
            ) : (
              <Input
                label="User Name"
                onChange={(event: any) => setUserName(event.target.value)}
                type="text"
                id="user-name"
                // name="C"
                value={userName}
              />
            )}
            <Input
              label="Email"
              onChange={(event: any) => setEmail(event.target.value)}
              type="email"
              id="email"
              // name="Credentials"
              value={email}
            />
            <Input
              label="Password"
              onChange={(event: any) => setPassword(event.target.value)}
              type="password"
              id="password"
              // name="Credentials"
              value={password}
            />
            <button
              onClick={variant ? () => login("credentials") : register}
              className="bg-red-600 text-white rounded-md border-1 border-transparent py-4 hover:bg-red-700 transition z-10"
            >
              {variant ? "Login" : "Sign Up"}
            </button>
            {variant ? (
              <span className="flex items-center justify-center">Or</span>
            ) : (
              ""
            )}

            {variant ? (
              <div className="Oauth flex items-center justify-center gap-4  z-10">
                <FaGooglePlusG
                  color=""
                  size={40}
                  onClick={() => login("google")}
                  className="cursor-pointer text-blue-300 hover:text-blue-500"
                />
                <FaGithub
                  size={25}
                  onClick={() => login("github")}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </div>
            ) : (
              ""
            )}
            <p className="text-neutral-500  z-10 text-sm">
              {variant
                ? "First time using iAnime?"
                : "Already have an Account?"}
              <span
                onClick={toggleVariant}
                className="text-white z-10  ms-2 hover:underline cursor-pointer "
              >
                {variant ? "Create and account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Login);
