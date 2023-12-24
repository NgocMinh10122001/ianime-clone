"use client";
import React, { memo, useCallback, useEffect } from "react";
import Image from "../../../node_modules/next/image";
import Anime from "../re-components/Anime";
import { signOut } from "next-auth/react";
import axios from "axios";

// import { cookies } from "../../../node_modules/next/dist/client/components/headers";

const FreshLoad = () => {
  // const { token } = props;
  // console.log("check token");
  // const getUser = useCallback(async () => {
  //   const response = await axios.get("/api/get-all-users");
  // }, []);

  return (
    <div className="fresh__load__container container max-w-full my-12 ">
      {/* <div className="py-8">
        <button
          className="border-2 rounded-md border-transparent dark:bg-white bg-black dark:text-black text-white p-4"
          type="button"
          onClick={() => signOut()}
        >
          Log-out
        </button>
      </div> */}
      {/* <div className=""></div> */}

      <div className="title flex justify-between  pb-4">
        <div className="text-black dark:text-white text-3xl tracking-normal">
          Mới tải lên
        </div>
        <button
          // onClick={getUser}
          className="text-black dark:text-white text-xl font-light border border-black  rounded-md  px-4 dark:border-white tracking-widest hover:bg-[color:var(--bg-footer-sun)] dark:hover:bg-[color:var(--navbar-hover-color)]"
        >
          Tất cả
        </button>
      </div>
      <Anime />
    </div>
  );
};

export default memo(FreshLoad);
