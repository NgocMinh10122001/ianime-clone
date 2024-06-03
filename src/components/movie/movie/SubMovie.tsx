"use client";
import useResizeSubMovie from "@/custom-hook/useResizeSubMovie";
import React, { memo } from "react";
import FeaturesMovie from "./FeaturesMovie";

interface IProps {
  url: string;
  title: string;
  view: number;
  id: string;
}
function SubMovie(props: IProps) {
  let { url, title, view, id } = props;

  useResizeSubMovie();

  // const handleAddViewVideo = async (id: string, userId: string) => {
  //   // console.log("minhdz 1", id, userId);

  //   await addViewVideo(id, userId);
  // };
  return (
    <>
      <div className="h-fit w-full ">
        <iframe
          id="movie"
          width={"100%"}
          height={"525px"}
          src={`${url}`}
          title="How to use YouTube Data API &amp; Fetch API to show videos on your website, with Vanilla JavaScript"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="row-span-12 md:row-span-12 lg:row-span-12 mb-4 rounded-lg"
          // onClick={() => handleAddViewVideo(id, userId)}
        ></iframe>

        <p className="text-black dark:text-[var(--super-white)] font-semibold text-2xl">
          {title}
        </p>
        <p className="text-black dark:text-slate-400 text-sm font-light">
          <span className="text-black dark:text-slate-300 text-sm font-normal">
            {view}
          </span>{" "}
          lượt xem
        </p>
        <div className="video-feature w-full  flex flex-wrap gap-y-4 pt-4">
          <FeaturesMovie />
        </div>
      </div>
    </>
  );
}

export default memo(SubMovie);
