"use client";
import Input from "@/components/re-components/Input";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaGooglePlusG, FaGithub } from "react-icons/fa";
import axios from "axios";
import useResizeLoginForm from "@/custom-hook/useResizeLoginForm";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Iprops {
  errorLogin: boolean;
}
function Login(props: Iprops) {
  const { errorLogin } = props;
  const [errLog, setErrLog] = useState<boolean>(errorLogin);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState(true);
  const buttonRef = useRef(null);

  // useResizeLoginForm();

  // thuc ra khong can dung useCallback o cho nay
  const toggleVariant = () => {
    // console.log("hceck variant");
    setErrLog(false);
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
      let logined = await signIn(provider, {
        email,
        password,
        redirect: true,
        callbackUrl: "/layout/home",
      });
    } catch (error) {
      toast.error("login failure, try again!");
      console.log("check err", error);
    }
  };

  const register = useCallback(async () => {
    console.log("hceck red");

    try {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (pattern.test(email)) {
        let user = await axios.post("/api/register", {
          email,
          userName,
          password,
        });
        if (user) {
          toast.success("register successfully!");
          setEmail("");
          setPassword("");
          setUserName("");
          return;
        } else {
          toast.error("register failure, try again!");
          return;
        }
      } else {
        toast.error("register failure, try again!");
        return;
      }
    } catch (error) {
      toast.error("register failure, try again!");
      console.log(error);
    }
  }, [email, userName, password]);
  const router = useRouter();
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // Perform action when Enter key is pressed
      if (variant) {
        login("credentials");
      } else {
        register();
      }
      // You can perform any other action here
    }
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  return (
    <div className="bg-[url('/riot.jpeg')] bg-cover bg-center bg-no-repeat w-full h-screen flex justify-center items-center relative">
      <div className=" bg-gradient-to-b from-transparent to-black opacity-95 absolute top-0 bottom-0 right-0 left-0 "></div>
      <div className="flex justify-center items-center  ">
        <div
          id="login-form"
          className="bg-black bg-opacity-70 px-8 py-8  self-center mt-2  rounded-md mx-[10%] w-[640px] sm:w-[548px] md:w-[740px] lg:w-[608px] xl:w-[500px]"
        >
          <h2 className="text-white text-2xl font-semibold mb-5">
            {/* <>{console.log("check")}</> */}
            {variant ? "Sign In" : "Register"}
          </h2>
          {errLog ? (
            <p className="text-red-500 text-sm font-sans mb-5">
              Your username or password may be incorrect, or you may need to
              update to a IAnime Account if you haven’t used in a few months.
              Check the Can’t sign in link for more info.
            </p>
          ) : (
            ""
          )}
          <div
            className="flex flex-col gap-6"
            onKeyDown={(event) => handleKeyDown(event)}
          >
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
              onChange={(event: any) => handleEmail(event.target.value)}
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
              ref={buttonRef}
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
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default memo(Login);
