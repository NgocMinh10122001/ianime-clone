import Dashboard from "@/client/admin/Dashboard";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

// interface IPage {
//   page : number
// }

export default async function page(props: any) {
  const session = await getServerSession(options);
  // console.log("check session", session);

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
    `${process.env.HTTP_API_URL}/api/get-all-users?page=${page}&&limit=${limit}`,

    {
      method: "GET",
      headers: { token: `${session?.user.accessToken}` },
      next: { tags: ["manage-user"] },
    }
  );
  const data = await res.json();
  // console.log("check data", data);
  return (
    <div className="">
      <Dashboard
        users={data?.users ? data.users : []}
        meta={{
          current: page,
          pageSize: limit,
          total: data?.totalRecord ? data.totalRecord : 1,
        }}
      />
    </div>
  );
}
