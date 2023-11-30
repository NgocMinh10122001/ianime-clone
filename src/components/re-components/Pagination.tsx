"use client";
import React, { useState } from "react";
import Link from "../../../node_modules/next/link";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const mockArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  // total record in per page
  const recordsPerPage = 5;
  // next page get element from current page

  // const nextIndex = currentPage * recordsPerPage;
  // console.log("check 1", nextIndex);

  // prev page get element in one page

  // const prevIndex = nextIndex - recordsPerPage;
  // console.log("check 1", prevIndex);

  // lay tu ptu dau den next index

  // const records = mockArray.slice(prevIndex, nextIndex);
  const totalPage = Math.ceil(mockArray.length / recordsPerPage);
  // create new array have key (simular anynomus array)
  const arrayKeyCopy = [...Array(totalPage + 1).keys()].slice(1);
  // console.log("check", arrayKeyCopy);

  // console.log("check total", totalPage);
  const handleChangePage = (item: number) => {
    setCurrentPage(item);
  };

  // const prevPage = () => {
  //   if (prevIndex + 1 === 1) {
  //   }
  //   setCurrentPage(currentPage - 1);
  // };
  // const nextPage = () => {
  //   if (nextIndex === mockArray.length) {
  //   }
  //   setCurrentPage(currentPage + 1);
  // };
  return (
    <div className="flex items-center justify-between px-4 py-8 sm:px-6">
      <div className=" flex flex-1 items-center justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {currentPage === 1 ? (
              ""
            ) : (
              <Link
                onClick={() => handleChangePage(currentPage - 1)}
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {/* <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a> */}

            {arrayKeyCopy.map((item, index) => {
              return (
                <Link
                  key={index}
                  href="#"
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === item ? "bg-pink-500 " : ""
                  } dark:text-[var(--text-white)]`}
                  onClick={() => handleChangePage(item)}
                >
                  {item}
                </Link>
              );
            })}
            {currentPage === totalPage ? (
              ""
            ) : (
              <Link
                onClick={() => handleChangePage(currentPage + 1)}
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
