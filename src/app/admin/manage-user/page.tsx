// import Dashboard from "@/client/admin/Dashboard";
// import { NextApiRequest } from "next";
// import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageUser from "@/components/admin/user/ManageUser";

// interface IPage {
//   page : number
// }

export default async function page(props: any) {
  const session = await getServerSession(options);
  // // console.log("check session", session);

  let { searchParams } = props;
  let page = props?.searchParams?.page ?? 1;
  let search = props?.searchParams?.search;
  if (page <= 1) page = 1;
  let limit = 6;

  const res = await fetch(
    `${
      process.env.HTTP_API_URL
    }/api/get-all-users?page=${page}&&limit=${limit}${
      search ? `&&search=${search}` : ""
    }`,

    {
      method: "GET",
      headers: { token: `${session?.user.accessToken}` },
      // cache: "no-store",
      next: { tags: ["manage-user"] },
    }
  );
  const data = await res.json();
  // console.log("check", data);

  return (
    <div className=" mt-8">
      <ManageUser
        users={data?.users || []}
        paginateA={{
          total: data?.totalRecord || 6,
          pageSize: limit || 6,
          current: page || 1,
        }}
        valueSearch={search ?? ""}
      />
    </div>
  );
}
