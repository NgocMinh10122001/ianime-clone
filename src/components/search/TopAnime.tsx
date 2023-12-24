import React, { memo } from "react";
import Anime from "../re-components/Anime";
import Pagination from "../re-components/Pagination";

function TopAnime() {
  return (
    <div className="top__anime__container">
      <Pagination />
      <Anime />
      {/* <Pagination /> */}
    </div>
  );
}

export default memo(TopAnime);
