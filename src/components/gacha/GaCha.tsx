"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { GiMagicBroom } from "react-icons/gi";

interface IProps {
  random: number[];
}
function GaCha(props: IProps) {
  let { random } = props;
  let [randomN, setRandomN] = useState<number>(1);
  let router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const random = searchParams.get("random");
    setRandomN(Number(random) || 1);
  }, []);

  const handleChecked = (random: number) => {
    // console.log(pathname);
    setRandomN(random);
  };

  const handleGaCha = () => {
    router.replace(`${pathname}?random=${randomN}`);
  };
  const handleDeleteGaCha = () => {
    router.replace(`${pathname}`);
  };
  return (
    <div className="flex flex-col py-6  h-fit ">
      <div className="flex flex-col gap-4">
        {random &&
          random.length > 0 &&
          random.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="random"
                className="accent-black w-5 h-5 cursor-pointer"
                checked={randomN === item}
                onChange={() => handleChecked(item)}
              />
              <label className="text-neutral-900 dark:text-white cursor-pointer">
                x{item}
              </label>
            </div>
          ))}
      </div>
      <div className="pt-4 w-full">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-3   py-1 rounded-sm cursor-pointer text-neutral-900 bg-pink-300 hover:bg-pink-400"
          onClick={handleGaCha}
        >
          <GiMagicBroom size={26} />
          <span className="uppercase tracking-widest font-light">gacha</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4   py-2 rounded-sm cursor-pointer text-white bg-black hover:bg-[var(--navbar-color)] dark:bg-[var(--navbar-color)] dark:hover:bg-[var(--navbar-hover-color)]"
          onClick={handleDeleteGaCha}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 stroke-pink-300 dark:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <span className="uppercase tracking-widest  text-sm  text-pink-300 dark:text-white font-light dark:font-normal">
            {" "}
            xoá hết{" "}
          </span>
        </button>
      </div>
    </div>
  );
}

export default memo(GaCha);
