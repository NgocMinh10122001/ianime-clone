import { options } from "@/app/api/auth/[...nextauth]/options";
import AnimeFavorite from "@/components/re-components/AnimeFavorite";
import { getServerSession } from "next-auth";
import React from "react";
import Favorite from "./Favorite";

async function page() {
  const session = await getServerSession(options);
  // console.log(session);

  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/favorite?userId=${session?.user?.id}`,
    {
      method: "GET",
      next: { tags: ["favorite"] },
    }
  );
  const data = await res.json();
  // console.log("check data", data);

  return (
    <div className="w-full  mtop-64 padding-x-4 py-4 flex flex-col justify-center">
      {data?.data?.length > 0 ? (
        <Favorite id={session?.user?.id ?? ""} />
      ) : (
        <div className="text-neutral-900 dark:text-white w-full flex justify-center">
          Bạn chưa lưu phim nào trên thiết bị này ...!
        </div>
      )}
      <AnimeFavorite animes={data?.data || []} />
    </div>
  );
}

export default page;
