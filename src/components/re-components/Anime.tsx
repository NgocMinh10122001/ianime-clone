import React from "react";

export default function Anime() {
  return (
    <div className="content__container grid grid-cols-2 gap-2 sm:grid-cols-6  sm:gap-2 ">
      <div className="content  bg-[color:var(--bg-footer-sun)] w-fit h-fit dark:bg-[color:var(--navbar-color)] rounded-t-lg rounded-b-lg overflow-hidden">
        {/* <Image
          src="/anime.webp"
          alt="No picture"
          className="bg-cover"
          width={120}
          height={200}
          style={{ objectFit: "contain" }}
          sizes="width : "
          w-[18.5rem]
        /> */}
        <div className="hover:scale-105 duration-300 hover:cursor-pointer bg-[url('/anime.webp')] rounded-t-lg  bg-cover bg-center bg-no-repeat w-296 sm:w-[14.25rem] h-420 sm:h-[20rem] after:content-['2'] after:ml-0.5 after:top-90 sm:after:top-85 after:left-85 sm:after:left-80 after:bottom-0 relative after:text-red-500 block after:absolute after:w-9 after:flex after:justify-center after:items-center after:h-9 after:rounded-full after:bg-pink-300"></div>
        {/* <img src="/anime.webp" alt="no picture" className="" /> */}
        <div className="content__title text-black dark:text-white flex justify-center pt-4 pb-2">
          Mahou Touki Lilustear 1
        </div>
        <div className="content__views flex justify-center pb-8 items-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 fill-black dark:fill-none dark:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-black dark:text-white flex justify-center text-sm">
            100.000
          </p>
        </div>
      </div>
    </div>
  );
}
