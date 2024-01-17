import { IDataFetching } from "@/types/index";
import Link from "next/link";
import React, { memo } from "react";

interface IProps {
  dataFetching: IDataFetching[];
  isToggleDataSearch: boolean;
}
function DataSearchOnChange(props: IProps) {
  let { dataFetching, isToggleDataSearch } = props;
  // console.log(dataFetching);

  return (
    <>
      {isToggleDataSearch ? (
        <div className="absolute right-0 left-0 top-[110%] h-fit py-4 bg-pink-200 dark:bg-[var(--navbar-hover-color)] rounded-md flex items-center flex-col justify-center z-20">
          {dataFetching &&
            dataFetching.length > 0 &&
            dataFetching.map((item) => (
              <Link
                href={`#`}
                key={item.id}
                className="flex items-center w-full h-fit hover:bg-pink-100 dark:hover:bg-[var(--navbar-hover-color2)] py-2"
              >
                <div className="px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-black dark:stroke-white "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <p className="text-black dark:text-white cursor-default">
                  {item.title}
                </p>
              </Link>
            ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default memo(DataSearchOnChange);
