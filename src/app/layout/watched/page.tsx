import Anime from "@/components/re-components/Anime";
import React from "react";
import Watched from "./Watched";
import { cookies } from "next/headers";
async function page() {
  // console.log(session);
  const cookieStore = cookies();
  const moviesWatched = cookieStore.get("movieWatched");
  // console.log(cookieStore.getAll());

  const res = await fetch(`${process.env.HTTP_API_URL}/api/watched`, {
    method: "GET",
    headers: {
      cookie: `movieWatched=${moviesWatched?.value}`,
    },
    next: { tags: ["watched"] },
  });
  const data = await res.json();
  // console.log("check data", data);

  return (
    <div className="w-full h-full mtop-64 padding-x-4 py-4 flex flex-col justify-center">
      {data?.data?.length > 0 ? (
        <Watched />
      ) : (
        <div className="text-neutral-900 dark:text-white w-full flex justify-center">
          Bạn chưa xem phim nào trên thiết bị này ...!
        </div>
      )}
      <Anime animes={data?.data || []} commingsoon={""} />
    </div>
  );
}

export default page;
