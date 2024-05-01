import AnimeVietSub from "../vietsub/AnimeVietSub";

export default async function page(props: any) {
  const { searchParams } = props;
  const page: string | number = searchParams?.page || 1;
  const limit: number = 24;

  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/18+?page=${page}&&limit=${limit}`,
    {
      method: "GET",
      next: { tags: ["18+"] },
    }
  );
  const data = await res.json();
  // console.log(data);

  return (
    <div className="w-full mtop-64 padding-x-4">
      <AnimeVietSub
        animes={data ? data.data : []}
        total={data ? data.totalPage : 24}
        page={page as number}
        limit={limit}
      />
    </div>
  );
}
