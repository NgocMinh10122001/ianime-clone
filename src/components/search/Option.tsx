"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useCallback, useState } from "react";
import { MdFiberNew } from "react-icons/md";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { HiFire } from "react-icons/hi";
import ModalSearch from "./ModalSearch";
interface IOption {
  svg: any;
  title: string;
}

interface IProps {
  options: IOption[];
  genres: any;
  firms: any;
  dates: any;
  // page: number;
  // genre: string;
  // firm: string;
  // release: string;
}

const sortTitle = [
  {
    svg: <MdFiberNew size={20} />,
    sort: "new",
    title: "Mới tải lên",
  },
  {
    svg: <HiFire size={20} />,
    sort: "top",
    title: "Xem nhiều nhất",
  },
  {
    svg: <FcAlphabeticalSortingAz size={20} />,
    sort: "az",
    title: "Bảng chữ cái",
  },
];
function Option(props: IProps) {
  let { options, genres, firms, dates } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState([]);
  const [titleModal, setTitleModal] = useState("");
  const [sort, setSort] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  let param = useSearchParams();
  let params = new URLSearchParams(param);
  let genre = params.get("genre");
  let firm = params.get("firm");
  let release = params.get("release");
  let page = params.get("page");
  let orderBy = params.get("orderby");

  const showModal = useCallback((title: string) => {
    setSort(false);
    setIsModalOpen(true);
    if (title === "genre") {
      setModalProps(genres);
      setTitleModal("genre");
    } else if (title === "firm") {
      setModalProps(firms);
      setTitleModal("firm");
    } else {
      setModalProps(dates);
      setTitleModal("release");
    }
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleRefresh = useCallback(() => {
    router.replace(`${pathName}`);
  }, []);

  const handleToggleSort = () => {
    setSort(!sort);
  };

  const demand = useCallback(
    (
      orderby: string,
      order: string,
      genre: string,
      firm: string,
      release: string,
      page: string | number
    ) => {
      router.replace(
        `${pathName}?orderby=${orderby}&&order=${order}&&genre=${genre}&&firm=${firm}&&release=${release}&&page=${page}`
      );
    },
    [router, pathName]
  );

  const handleSort = useCallback(
    (sort: string) => {
      if (sort === "new") {
        demand(
          "new",
          "desc",
          genre || "",
          firm || "",
          release || "",
          page || "1"
        );
      } else if (sort === "top") {
        demand(
          "top",
          "desc",
          genre || "",
          firm || "",
          release || "",
          page || "1"
        );
      }
      if (sort === "az") {
        demand(
          "az",
          "desc",
          genre || "",
          firm || "",
          release || "",
          page || "1"
        );
      }
    },
    [demand, genre, firm, release, page]
  );
  return (
    <div className="options__container flex flex-wrap  mb-4 py-4  ">
      <div
        className="absolute top-0 bottom-0 right-0 left-0 "
        onClick={() => setSort(false)}
      ></div>
      {options?.length > 0 &&
        options.map((item, index) => {
          return (
            <div
              key={index}
              className="option me-2 mt-2 sm:mt-4 bg-[var(--color-btn-sun)] dark:bg-[var(--navbar-hover-color)] dark:hover:bg-neutral-700 duration-200 ease-in hover:bg-pink-500 w-fit flex items-center rounded-md py-2 px-4 hover:cursor-pointer z-10"
              onClick={() => showModal(item.title)}
            >
              {item.svg}
              <span className="ps-2 uppercase text-sm tracking-widest font-medium text-[var(--text-black)] dark:text-[var(--text-white)]">
                {(item.title === "genre" && "Thể loại") ||
                  (item.title === "firm" && "Hãng") ||
                  (item.title === "release" && "Năm phát hành")}
              </span>
            </div>
          );
        })}

      <div
        onClick={handleToggleSort}
        className="option relative me-2 mt-2 sm:mt-4 bg-[var(--color-btn-sun)] dark:bg-[var(--navbar-hover-color)] dark:hover:bg-neutral-700 duration-200 ease-in hover:bg-pink-500 w-fit flex items-center rounded-md py-2 px-4 hover:cursor-pointer z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
          />
        </svg>

        <span className="ps-2 uppercase text-sm tracking-widest font-medium text-[var(--text-black)] dark:text-[var(--text-white)]">
          Sắp xếp
        </span>
        {sort ? (
          <div className="absolute top-full left-0 w-fit p-2 bg-pink-300 dark:bg-[var(--navbar-color)] rounded-sm  z-20">
            {sortTitle &&
              sortTitle.length > 0 &&
              sortTitle.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-[180px] items-center gap-3  hover:bg-pink-500 hover:dark:bg-[var(--navbar-hover-color)] rounded-lg p-1 duration-200 ease-in-out "
                    onClick={() => handleSort(item.sort)}
                    style={{
                      backgroundColor: `${
                        orderBy === item.sort
                          ? "rgb(236 72 153 / var(--tw-bg-opacity))"
                          : ""
                      }`,
                    }}
                  >
                    <div className="p-1">{item.svg}</div>
                    <span className="text-black dark:text-white flex flex-nowrap">
                      {item.title}
                    </span>
                  </div>
                );
              })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className="option mt-2 sm:mt-4 bg-[var(--color-btn-sun)] hover:bg-pink-500 dark:bg-pink-900 dark:hover:bg-pink-500 duration-200 ease-in w-fit flex items-center rounded-md py-2 px-4 hover:cursor-pointer z-10"
        onClick={handleRefresh}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>

        <span className="ps-2 uppercase text-sm tracking-widest font-medium text-[var(--text-black)] dark:text-[var(--text-white)]">
          Làm mới
        </span>
      </div>
      <ModalSearch
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modalProps={modalProps}
        titleModal={titleModal}
      />
    </div>
  );
}
export default memo(Option);
