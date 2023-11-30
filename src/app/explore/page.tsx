import Branch from "@/components/explore/Branch";
import Category from "@/components/explore/Category";
import React from "react";

export default function Explore() {
  return (
    <div className="explore__container container py-4 max-w-[1440px] ">
      <Branch />
      <Category />
    </div>
  );
}
