import Branch from "@/components/explore/Branch";
import Category from "@/components/explore/Category";
import React, { memo } from "react";

function Explore() {
  return (
    <div
      className="explore__container container max-w-[1440px] "
      style={{ padding: "16px" }}
    >
      <Branch />
      <Category />
    </div>
  );
}

export default memo(Explore);
