"use client";
import React, { memo } from "react";

interface Iput {
  id: string;
  onChange: any;
  value: string;
  type?: string;
  label: string;
  // name: string;
}
function Input({ id, onChange, value, type, label }: Iput) {
  return (
    <div className="relative">
      {/* <>{console.log("rande")}</> */}
      <input
        onChange={onChange}
        id={id}
        // name={name}
        className="block rounded-md px-3 pt-4 pb-1 w-full text-sm text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer "
        type={type}
        placeholder=""
        value={value}
      />
      <label
        className="absolute text-base text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] left-3 peer-placeholder-shown:scale-90 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default memo(Input);
