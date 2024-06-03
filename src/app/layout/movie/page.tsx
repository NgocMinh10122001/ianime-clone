import { options } from "@/app/api/auth/[...nextauth]/options";
import LittleMovie from "@/components/re-components/LittleMovies";
import Movie from "@/components/re-components/Movie";
import { addViewVideo, storeMovieWatched } from "@/server-action/user";
import { getServerSession } from "next-auth";
// import { headers } from "next/headers";
import React from "react";

export default async function page(props: any) {
  // const headersList = headers();
  // const header_url = headersList.get("referer") || "";
  const decodeUrl = decodeURIComponent(`${props.params.name}`);
  // console.log(decodeUrl);

  // console.log(props);
  let { searchParams } = props;
  let id: string = searchParams ? searchParams.id : "";
  let firm: string = searchParams ? searchParams.firm : "";
  let release: string = searchParams ? searchParams.release : "";
  let genre: string = searchParams ? searchParams.genre : "";
  let name: string = decodeUrl || "";
  // console.log(genre);
  const session = await getServerSession(options);

  // storeMovieWatched(id);
  await addViewVideo(id, session?.user?.id || "");

  const res = await fetch(`${process.env.HTTP_API_URL}/api/movie?id=${id}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    method: "GET",
    next: { tags: ["movie-anime-detail"] },
    // cache: "no-store",
  });
  const data = await res.json();
  // console.log(data.anime);

  return (
    <div className="padding-x-4 mtop-64 w-full grid grid-cols-12 gap-4 font-sans">
      <Movie anime={data?.anime ? data.anime : []} />
      <LittleMovie
        sameName={data?.sameName ? data.sameName : []}
        sameFirm={data?.sameFirm ? data.sameFirm : []}
        sameGenre={data?.sameGenre ? data.sameGenre : []}
        sameRelease={data?.sameRelease ? data.sameRelease : []}
        theFirm={data?.anime?.firm || {}}
        release={data?.anime?.release || {}}
      />
    </div>
  );
}
