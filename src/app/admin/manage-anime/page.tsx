import Dashboard from "@/client/admin/Dashboard";
import ManageAnime from "@/client/admin/ManageAnime";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

// interface IPage {
//   page : number
// }

export default async function page(props: any) {
  let { searchParams } = props;
  let page = props?.searchParams?.page ?? 1;
  let limit = 6;
  // console.log("check ", searchParams.page);

  // let page: number;
  // let page = 0;

  // const paginate = (pageNest: number) => {
  //   page = pageNest;
  //   return page;
  // };
  // noStore();
  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/manage-animes?page=${page}&&limit=${limit}`,

    {
      method: "GET",
      next: { tags: ["manage-animes"] },
    }
  );
  const data = await res.json();
  // console.log("check data", data.genres);

  const genres = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/genres`,

    {
      method: "GET",
      next: { tags: ["genres"] },
    }
  );
  const dataGenres = await genres.json();
  // console.log("check data", dataGenres);
  return (
    <div className="">
      <ManageAnime
        genres={dataGenres ? dataGenres : []}
        animes={data?.animes ? data.animes : []}
        meta={{
          current: page,
          pageSize: limit,
          total: 1,

          // total: data?.totalRecord ? data.totalRecord : 1,
        }}
        title={{
          title: "Name Anime",
          des: "Description",
          duration: "Duration",
        }}

        // users={data?.animes ? data.animes : []}
        // meta={{
        //   current: page,
        //   pageSize: limit,
        //   total: data?.totalRecord ? data.totalRecord : 1,
        // }}
      />
    </div>
  );
}
