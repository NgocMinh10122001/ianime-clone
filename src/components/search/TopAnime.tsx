import React from "react";
import Anime from "../re-components/Anime";
import Pagination from "../re-components/Pagination";

export default function TopAnime() {
  return (
    <div className="top__anime__container">
      <Pagination />
      <Anime />
      {/* <Pagination /> */}
    </div>
  );
}
