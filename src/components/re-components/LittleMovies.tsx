"use client";
import { IAnime, IRelease, ITheFirm } from "@/types/index";
import React, { memo } from "react";
import LittleMovie from "../movie/little-movie/LittleMovie";

interface INewAnime extends IAnime {
  firm: ITheFirm;
}

interface IProps {
  sameName: INewAnime[];
  sameFirm: INewAnime[];
  sameGenre: INewAnime[];
  sameRelease: INewAnime[];
  theFirm: ITheFirm;
  release: IRelease;
}
function LittleMovies(props: IProps) {
  let { sameName, sameFirm, sameGenre, sameRelease, theFirm, release } = props;
  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col py-4  h-fit">
      <LittleMovie
        animeRelate={sameName}
        relate={"Phim gợi ý"}
        theFirm={{}}
        release={{}}
      />
      <LittleMovie
        animeRelate={sameFirm}
        relate={"Phim của hãng"}
        theFirm={theFirm}
        release={{}}
      />
      <LittleMovie
        animeRelate={sameRelease}
        relate={"Phim thuộc năm"}
        theFirm={{}}
        release={release}
      />
      <LittleMovie
        animeRelate={sameGenre}
        relate={"Phim cùng thể loại"}
        theFirm={{}}
        release={{}}
      />
    </div>
  );
}

export default memo(LittleMovies);
