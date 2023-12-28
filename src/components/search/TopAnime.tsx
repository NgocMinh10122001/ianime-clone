import React, { memo } from "react";
import Anime from "../re-components/Anime";

function TopAnime() {
  return (
    <div className="top__anime__container ">
      <Anime />
    </div>
  );
}

export default memo(TopAnime);
