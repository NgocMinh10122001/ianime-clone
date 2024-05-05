"use client";
import {
  disLikeVideo,
  likeVideo,
  saveFavoriteMovie,
} from "@/server-action/user";
import { Modal } from "antd";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { memo, useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFeature {
  svg: any;
  name: string;
  id: string;
}
const featureArray: IFeature[] = [
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4  stroke-black  dark:stroke-white z-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
        />
      </svg>
    ),
    name: "0",
    id: "like",
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4  stroke-black  dark:stroke-white z-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
        />
      </svg>
    ),
    name: "0",
    id: "like",
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4  stroke-black  dark:stroke-white z-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    ),
    name: "Lưu",
    id: "save",
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4  stroke-black  dark:stroke-white z-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
        />
      </svg>
    ),
    name: "Chia sẻ",
    id: "share",
  },
];
function FeaturesMovie() {
  const { data: session } = useSession();
  const params = useSearchParams();
  let movieId = params.get("id");
  let [isToggleShare, setToggleShare] = useState(false);
  const pathName = usePathname();
  // console.log(session);

  const showModal = () => {
    setToggleShare(true);
  };

  const handleOk = () => {
    setToggleShare(false);
  };

  const handleCancel = () => {
    setToggleShare(false);
  };

  const handleLikeMovie = async (
    animeId: string | null,
    userId: string | undefined
  ) => {
    await likeVideo(animeId || "", userId || "");
  };

  const handleDislikeMovie = async (
    animeId: string | null,
    userId: string | undefined
  ) => {
    await disLikeVideo(animeId || "", userId || "");
  };

  const handleSaveFavoriteMovie = useCallback(
    async (movieId: string | null, session: Session | null, id: string) => {
      // console.log("item", item);
      // console.log("session", session);
      if (id === "save") {
        const connected = await saveFavoriteMovie(session?.user?.id, movieId);
        if (connected) {
          toast.success("movie saved to Favorite movie!");
        } else {
          toast.error("existed favorite movie!");
        }
      } else if (id === "like") {
        handleLikeMovie(movieId, session?.user?.id);
      } else if (id === "dislike") {
        handleDislikeMovie(movieId, session?.user?.id);
      } else if (id === "share") {
        showModal();
      }
    },
    [movieId, session]
  );
  const handleCopyButtonClick = () => {
    // Lấy nội dung cần copy (trong trường hợp này, lấy nội dung của phần tử có id là "contentToCopy")
    const contentToCopy = document.getElementById("contentToCopy");

    if (contentToCopy) {
      // Tạo một textarea ẩn để chứa nội dung cần copy
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = contentToCopy.innerText;
      document.body.appendChild(tempTextarea);

      // Chọn toàn bộ nội dung trong textarea
      tempTextarea.select();
      tempTextarea.setSelectionRange(0, 99999); // For mobile devices

      // Sao chép nội dung vào clipboard
      document.execCommand("copy");

      // Xóa textarea sau khi copy
      document.body.removeChild(tempTextarea);

      // Thông báo hoặc thực hiện các xử lý khác (nếu cần)
      toast.success("Sao chép URL thành công!");
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />

      <div className="flex items-center flex-wrap gap-2">
        {featureArray &&
          featureArray.length > 0 &&
          featureArray.map((item, index) => (
            <div
              key={index}
              className={`w-fit px-4 py-2 flex gap-2  rounded-full items-center relative  bg-pink-400 ${
                item.id !== "like" &&
                "hover:bg-pink-500 ease-in-out duration-150"
              } ${
                item.id !== "like" &&
                "dark:hover:bg-[var(--navbar-hover-color2)]"
              } dark:bg-[var(--active-dark)]  ${
                item.id !== "like" && "cursor-pointer"
              }`}
              onClick={() => handleSaveFavoriteMovie(movieId, session, item.id)}
            >
              {item.id === "like" && (
                <div className="absolute  bg-pink-400 dark:bg-[var(--navbar-color)] top-0 bottom-0 left-0 right-0 rounded-full z-10 opacity-80"></div>
              )}
              {item.svg}
              <span
                className="text-neutral-900 dark:text-white z-0 cursor-default text-sm"
                style={{
                  // opacity: `${item.id !== "like" && 0.5}`,
                  cursor: `${item.id !== "like" && "pointer"}`,
                }}
              >
                {item.name}
              </span>
            </div>
          ))}
        <Modal
          title="Chia sẻ"
          open={isToggleShare}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div
            id="contentToCopy"
            className="p-2 w-full border border-black rounded-md"
          >
            <p className="truncate text-neutral-900 ">{pathName}</p>
          </div>
          <div
            className="w-full flex justify-end"
            onClick={handleCopyButtonClick}
          >
            <button className="text-neutral-900 bg-orange-400 hover:bg-orange-500 rounded-md py-1 px-2 mt-4">
              Sao chép URL
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default memo(FeaturesMovie);
