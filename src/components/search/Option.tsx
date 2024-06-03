"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useCallback, useState } from "react";
import { MdFiberNew } from "react-icons/md";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { HiFire } from "react-icons/hi";
import ModalSearch from "./ModalSearch";
import { HiSortAscending } from "react-icons/hi";
import { IoMdRefreshCircle } from "react-icons/io";
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
    svg: (
      <MdFiberNew
        size={20}
        className="text-black dark:text-[var(--super-white)]"
      />
    ),
    sort: "new",
    title: "Mới tải lên",
  },
  {
    svg: (
      <HiFire size={20} className="text-black dark:text-[var(--super-white)]" />
    ),
    sort: "top",
    title: "Xem nhiều nhất",
  },
  {
    svg: (
      <FcAlphabeticalSortingAz
        size={20}
        className="text-black dark:text-[var(--super-white)]"
      />
    ),
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
  let name = params.get("name");

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
      name: string,
      orderby: string,
      order: string,
      genre: string,
      firm: string,
      release: string,
      page: string | number
    ) => {
      router.replace(
        `${pathName}?name=${name}&&orderby=${orderby}&&order=${order}&&genre=${genre}&&firm=${firm}&&release=${release}&&page=${page}`
      );
    },
    [router, pathName]
  );

  const handleSort = useCallback(
    (sort: string) => {
      if (sort === "new") {
        demand(
          name || "",
          "new",
          "desc",
          genre || "",
          firm || "",
          release || "",
          page || "1"
        );
      } else if (sort === "top") {
        demand(
          name || "",
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
          name || "",
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
    <div className="options__container flex flex-wrap  mb-4 py-4  font-sans">
      <div className="" onClick={() => setSort(false)}></div>
      {options?.length > 0 &&
        options.map((item, index) => {
          return (
            <div
              key={index}
              className="option me-2 mt-2 sm:mt-4 bg-[var(--super-white)] dark:bg-[var(--navbar-hover-color)] dark:hover:bg-neutral-700 duration-200 ease-in shadow-[var(--shadow-light-mode)] dark:ring-0 dark:hover:ring-0  shadow-md ring-1 ring-[var(--super-white)] hover:ring-2 hover:shadow-lg w-fit flex items-center rounded-md py-2 px-4 hover:cursor-pointer z-10"
              onClick={() => showModal(item.title)}
            >
              {item.svg}
              <span className="ps-2 uppercase text-sm tracking-widest font-medium text-neutral-900  dark:text-white">
                {(item.title === "genre" && "Thể loại") ||
                  (item.title === "firm" && "Hãng") ||
                  (item.title === "release" && "Năm phát hành")}
              </span>
            </div>
          );
        })}

      <div
        onClick={handleToggleSort}
        className="relative option me-2 mt-2 sm:mt-4 bg-[var(--super-white)] dark:bg-[var(--navbar-hover-color)] dark:hover:bg-neutral-700 duration-200 ease-in shadow-[var(--shadow-light-mode)] dark:ring-0 dark:hover:ring-0  shadow-md ring-1 ring-[var(--super-white)] hover:ring-2 hover:shadow-lg w-fit flex items-center rounded-md py-2 px-4 hover:cursor-pointer z-[15]"
      >
        <HiSortAscending className="w-6 h-6 text-black dark:text-[var(--super-white)]" />

        <span className="ps-2 uppercase text-sm tracking-widest font-medium text-neutral-900  dark:text-white">
          Sắp xếp
        </span>

        <div
          className={`absolute  ${
            sort
              ? "opacity-1 translate-x-0 z-20"
              : "opacity-0 -translate-x-[400%] -z-50"
          } top-[130%] left-0 border-t-[2px] border-[var(--bg-purple-ligth)] w-fit p-2 bg-[var(--super-white)] dark:bg-[var(--navbar-color)] rounded-b-lg duration-300 `}
        >
          {sortTitle &&
            sortTitle.length > 0 &&
            sortTitle.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`group   flex w-[180px] items-center gap-3  hover:bg-[var(--bg-purple-ligth)]  hover:dark:bg-[var(--navbar-hover-color2)] rounded-lg p-2 my-2 duration-200 ease-in-out`}
                  onClick={() => handleSort(item.sort)}
                  style={{
                    backgroundColor: `${
                      orderBy === item.sort ? "#7a59ff" : ""
                    }`,
                  }}
                >
                  <div className="p-1">{item.svg}</div>
                  <span className="group-hover:text-[var(--super-white)] text-black dark:text-[var(--super-white)] flex flex-nowrap">
                    {item.title}
                    <></>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <div
        className="option me-2 mt-2 sm:mt-4 bg-[var(--bg-purple-ligth)] duration-200 ease-in shadow-[var(--shadow-light-mode)] dark:ring-0 dark:hover:ring-0  shadow-md ring-1 ring-[var(--bg-purple-ligth)] hover:ring-2 hover:shadow-lg w-fit flex items-center rounded-md py-2 px-4 hover:cursor-pointer z-10"
        onClick={handleRefresh}
      >
        <IoMdRefreshCircle className="w-6 h-6 text-black dark:text-[var(--super-white)]" />

        <span className="ps-2 uppercase text-sm tracking-widest font-medium text-[var(--super-white)] ">
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
