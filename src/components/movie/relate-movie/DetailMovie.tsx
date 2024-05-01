"use client";
import useResizeDetailMovie from "@/custom-hook/useResizeDetailMovie";
import { IRelease, ITheFirm } from "@/types/index";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

interface IProps {
  theFirm: ITheFirm;
  title: string;
  release: IRelease;
  thumbnailUrl: string;
  otherName: string;
}

function DetailMovie(props: IProps) {
  let { theFirm, title, release, thumbnailUrl, otherName } = props;
  const router = useRouter();

  const dispatch1 = (id: string) => {
    router.push(`/layout/the-firm?theFirm=${id}`);
  };
  const dispatch2 = (id: string) => {
    router.push(`/layout/release?release=${id}`);
  };
  const vietnameseCharacters: Record<string, string> = {
    à: "a",
    á: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ằ: "a",
    ắ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ầ: "a",
    ấ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    è: "e",
    é: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ề: "e",
    ế: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    ì: "i",
    í: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ò: "o",
    ó: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ố: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ớ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ù: "u",
    ú: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ừ: "u",
    ứ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ỳ: "y",
    ý: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
    đ: "d",
  };

  const dispatchNameAnime = (nameAnime: string) => {
    // console.log(nameAnime.toLowerCase());
    let newValues = nameAnime.replace(
      /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g,
      (char) =>
        vietnameseCharacters[char as keyof typeof vietnameseCharacters] || char
    );

    router.replace(`/layout/search?name=${newValues}`);
  };
  useResizeDetailMovie();
  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 pt-4 border-t border-pink-600 dark:border-slate-400">
      <div
        id="imageDetailMovie"
        className="col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3   w-full h-[340px] bg-no-repeat bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url("${thumbnailUrl}")` }}
      >
        {" "}
      </div>
      <div className="col-span-7 sm:col-span-8 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9 flex flex-col gap-6">
        <div className="">
          <p className="text-black dark:text-slate-400 text-sm pb-1">Hãng</p>
          <span
            className="text-pink-500 dark:text-yellow-500 hover:text-pink-600 ease-in-out duration-150 dark:hover:text-yellow-600 cursor-pointer"
            onClick={() => dispatch1(theFirm.id)}
          >
            {theFirm.name || ""}
          </span>
        </div>
        <div>
          <p className="text-black dark:text-slate-400 text-sm pb-1">
            Tên Anime
          </p>
          <span
            className="text-pink-500 dark:text-yellow-500 hover:text-pink-600 ease-in-out duration-150 dark:hover:text-yellow-600 cursor-pointer"
            onClick={() => dispatchNameAnime(title)}
          >
            {title || ""}
          </span>
        </div>
        <div>
          <p className="text-black dark:text-slate-400 text-sm pb-1">
            Năm phát hành
          </p>
          <span
            className="text-pink-500 dark:text-yellow-500 hover:text-pink-600 ease-in-out duration-150 dark:hover:text-yellow-600 cursor-pointer"
            onClick={() => dispatch2(release.id)}
          >
            {release.year || ""}
          </span>
        </div>
        <div>
          <p className="text-black dark:text-slate-400 text-sm pb-1">
            Tên khác
          </p>
          <span
            className="text-pink-500 dark:text-yellow-500 hover:text-pink-600 ease-in-out duration-150 dark:hover:text-yellow-600 cursor-pointer"
            onClick={() => dispatchNameAnime(otherName)}
          >
            {otherName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(DetailMovie);
