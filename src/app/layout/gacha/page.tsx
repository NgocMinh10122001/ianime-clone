import GaCha from "@/components/gacha/GaCha";
import Anime from "@/components/re-components/Anime";
import AnimeGaCha from "@/components/re-components/AnimeGaCha";
import Link from "next/link";
import React from "react";

async function page(props: any) {
  const { searchParams } = props;
  const random: string | number = searchParams?.random || 0;
  //   const limit: number = 24;

  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/gacha?random=${random}`,
    {
      method: "GET",
      next: { tags: ["gacha"] },
    }
  );
  const data = await res.json();
  //   console.log(data);
  return (
    <div
      id="firtpage"
      className="padding-x-4 mtop-64 w-full grid grid-cols-12 font-sans"
    >
      <div className="col-span-5 sm:col-span-3 lg:col-span-2">
        <GaCha random={[1, 10, 20, 30]} />
      </div>
      <div className="col-span-7 sm:col-span-9  lg:col-span-10  flex flex-col gap-6  h-fit py-6">
        {data?.data?.length > 0 ? (
          <>
            <AnimeGaCha animes={data?.data || []} />
            <div className="w-full flex justify-center ">
              <Link
                href="#"
                className="py-2 px-4 flex items-center justify-center h-fit w-fit bg-pink-300 hover:bg-pink-400  text-neutral-900 gap-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 fill-black dark:fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
                <span className="text-sm uppercase text-neutral-900 ">
                  lên đầu trang
                </span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-neutral-900 dark:text-white italic">
            Chọn số phim bạn muốn GACHA và bấm nút!
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
