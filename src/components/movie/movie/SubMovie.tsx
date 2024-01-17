import React, { memo } from "react";
import FeaturesMovie from "./FeaturesMovie";

interface IProps {
  url: string;
  title: string;
  view: number;
}
function SubMovie(props: IProps) {
  let { url, title, view } = props;
  // console.log(url);

  return (
    <div className="h-full w-full ">
      <iframe
        width="100%"
        height="525px"
        src={`${url}`}
        title="How to use YouTube Data API &amp; Fetch API to show videos on your website, with Vanilla JavaScript"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="row-span-12 md:row-span-12 lg:row-span-12 pb-4"
      ></iframe>
      <p className="text-black dark:text-white font-normal text-lg">{title}</p>
      <p className="text-slate-700 dark:text-slate-400 text-sm">
        {view} luot xem
      </p>
      <div className="video-feature w-full h-full flex flex-wrap gap-4 pt-4">
        <FeaturesMovie />
      </div>
    </div>
  );
}

export default memo(SubMovie);
