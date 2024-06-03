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
    <div className="branch__container font-sans  grid grid-cols-2   md:grid-cols-4 md:px-0 lg:px-16 xl:px-24 gap-0 items-center justify-center w-full overflow-hidden mb-8">
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
                className="branch__content  bg-cover bg-center bg-no-repeat  w-full h-full relative sm:hover:scale-105  sm:hover:cursor-pointer sm:hover:shadow-[var(--bg-purple-ligth)] sm:dark:hover:shadow-[var(--super-white)]  sm:hover:shadow-xl duration-200 ease-in sm:hover:z-10 "
                style={{
                  backgroundImage: `url("${item.thumnail}")`,
                }}
              >
                <div className=" bg-gradient-to-b from-transparent to-black opacity-80 dark:opacity-95 absolute top-0 bottom-0 left-0 right-0"></div>
                <div className="branch__content__svg absolute bottom-20 sm:bottom-28 2xl:bottom-32 flex justify-center w-full ">
                  {(item.svg === "anime" && (
                    <HiFire
                      size={50}
                      className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] lg:h-[50px] lg:w-[50px] 2xl:w-[60px] 2xl:h-[60px] text-[var(--super-white)] "
                    />
                  )) ||
                    (item.svg === "collection" && (
                      <MdOutlineCollections
                        size={50}
                        className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] lg:h-[50px] lg:w-[50px] 2xl:w-[60px] 2xl:h-[60px] text-[var(--super-white)]"
                      />
                    )) ||
                    (item.svg === "genre" && (
                      <FaTags
                        size={50}
                        className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] lg:h-[50px] lg:w-[50px] 2xl:w-[60px] 2xl:h-[60px] text-[var(--super-white)]"
                      />
                    )) ||
                    (item.svg === "gacha" && (
                      <GiMagicBroom
                        size={50}
                        className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] lg:h-[50px] lg:w-[50px] 2xl:w-[60px] 2xl:h-[60px] text-[var(--super-white)]"
                      />
                    ))}
                </div>
                <div className="branch__content__name__des   absolute flex flex-col items-center justify-center w-full bottom-6 sm:bottom-9 sm:gap-2 md:gap-1 2xl:gap-2">
                  <span
                    id="titleBranch"
                    className="name  text-[var(--super-white)] font-black uppercase tracking-wide  text-2xl md:text-xl xl:text-2xl"
                  >
                    {item.titleBranch}
                  </span>
                  <span
                    id="desBranch"
                    className="des text-sm  text-[var(--text-white)] sm:text-base font-medium"
                  >
                    {/* text-sm */}
                    {item.desBranch}
                    <></>
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
