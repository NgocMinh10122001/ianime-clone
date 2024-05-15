"use client";
import React, { memo, useCallback } from "react";
import { MdOutlineCollections } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { GiMagicBroom } from "react-icons/gi";
import { HiFire } from "react-icons/hi";
import { useRouter } from "next/navigation";
import useResizeBranch from "@/custom-hook/useResizeBranch";

interface INestBranch {
  titleBranch: string;
  desBranch: string;
  svg: string;
  thumnail: string;
}
interface IProps {
  branchs: INestBranch[];
}
function Branch(props: IProps) {
  let { branchs } = props;
  const router = useRouter();
  const handleRedirect = useCallback((branch: string) => {
    if (branch === "anime") {
      router.push(`/layout/search`);
    } else if (branch === "collection") {
      router.push(`https://www.shutterstock.com/vi/search/cosplay`);
    } else if (branch === "genre") {
      router.push(`/layout/genre`);
    } else {
      router.push(`/layout/gacha`);
      return;
    }
  }, []);
  useResizeBranch();
  // h-564  md:h-[400px] lg:h-[490px] xl:h-572
  return (
    <div className="branch__container  grid grid-cols-2   md:grid-cols-4 md:px-0 lg:px-16 xl:px-24 gap-0 items-center justify-center w-full overflow-hidden mb-8">
      {branchs?.length > 0 &&
        branchs.map((item, index) => {
          return (
            <div
              id="branch"
              className="w-full h-[500px] sm:h-[602px] md:h-[466px] lg:h-[496px] xl:h-[572px]"
              key={index + 1}
              title={item.titleBranch}
              onClick={() => handleRedirect(item.svg)}
            >
              <div
                className="branch__content  bg-cover bg-center bg-no-repeat  w-full h-full relative sm:hover:scale-105  duration-300 sm:hover:cursor-pointer sm:hover:shadow-pink-200 sm:dark:hover:shadow-white  sm:hover:shadow-xl sm:hover:transition-transform sm:hover:z-10 "
                style={{
                  backgroundImage: `url("${item.thumnail}")`,
                }}
              >
                <div className=" bg-gradient-to-b from-transparent to-black opacity-95 absolute top-0 bottom-0 left-0 right-0"></div>
                <div className="branch__content__svg absolute bottom-24 sm:bottom-28 flex justify-center w-full ">
                  {(item.svg === "anime" && (
                    <HiFire size={50} color={"#fff"} />
                  )) ||
                    (item.svg === "collection" && (
                      <MdOutlineCollections size={50} color={"#fff"} />
                    )) ||
                    (item.svg === "genre" && (
                      <FaTags size={50} color={"#fff"} />
                    )) ||
                    (item.svg === "gacha" && (
                      <GiMagicBroom size={50} color={"#fff"} />
                    ))}
                </div>
                <div className="branch__content__name__des   absolute flex flex-col items-center justify-center w-full bottom-8 sm:bottom-9">
                  <span
                    id="titleBranch"
                    className="name  text-[var(--text-white)] font-bold uppercase  text-2xl"
                  >
                    {item.titleBranch}
                  </span>
                  <span
                    id="desBranch"
                    className="des text-sm  text-[var(--text-white)] sm:text-base font-extralight"
                  >
                    {/* text-sm */}
                    {item.desBranch}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default memo(Branch);
