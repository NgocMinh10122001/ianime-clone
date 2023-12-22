"use client";
import React from "react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="w-full h-screen">
      <Link
        className="text-blue-400 font-serif font-bold text-xl underline flex justify-center w-full h-full items-center"
        href="/layout/home"
      >
        You not a admin, please way back home page
      </Link>
    </div>
  );
}
