import React, { memo } from "react";

function Branch() {
  return (
    <div className="branch__container grid grid-cols-2 gap-0 sm:flex sm:justify-center overflow-hidden">
      <div className="branch__content bg-[url('/anime.webp')] bg-cover bg-center bg-no-repeat w-300 sm:w-304 h-564 sm:h-572 relative sm:hover:scale-105 duration-300 sm:hover:cursor-pointer sm:hover:transition-transform">
        <div className=" bg-gradient-to-b from-transparent to-black opacity-95 absolute top-0 bottom-0 left-0 right-0"></div>
        <div className="branch__content__svg absolute bottom-28 sm:bottom-32 flex justify-center w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 stroke-white dark:fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            />
          </svg>
        </div>
        <div className="branch__content__name__des   absolute flex flex-col items-center justify-center w-full bottom-8 sm:bottom-9">
          <span className="name  text-[var(--text-white)] font-bold uppercase text-2xl sm:text-3xl">
            Anime Hot
          </span>
          <span className="des text-sm  text-[var(--text-white)] sm:text-lg sm:font-extralight">
            phim nhiều lượt xem nhất
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Branch);
