import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageAnime from "@/components/admin/anime/ManageAnime";
import { getServerSession } from "next-auth";

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
    }/api/admin/manage-animes?page=${page}&&limit=${limit}${
      search ? `&&search=${search}` : ""
    }`,

    {
      method: "GET",
      headers: { token: `${session?.user.accessToken}` },
      // cache: "no-store",
      next: { tags: ["manage-animes"] },
    }
  );
  const data = await res.json();
  // console.log(data);

  return (
    <div className=" mt-8">
      <ManageAnime
        animes={data?.animes || []}
        genres={data?.genres || []}
        firms={data?.firms || []}
        releases={data?.releases || []}
        locales={data?.locales || []}
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
