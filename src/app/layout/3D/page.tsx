import AnimeVietSub from "../vietsub/AnimeVietSub";

export default async function page(props: any) {
  const { searchParams } = props;
  const page: string | number = searchParams?.page || 1;
  const limit: number = 24;

  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/3D?page=${page}&&limit=${limit}`,
    {
      method: "GET",
      next: { tags: ["3D"] },
    }
  );
  const data = await res.json();
  // console.log(data);

  return (
    <div className="w-full mtop-64 padding-x-4 font-sans">
      <AnimeVietSub
        animes={data ? data.data : []}
        total={data ? data.totalPage : 24}
        title={data ? data.title : ""}
        page={page as number}
        limit={limit}
      />
    </div>
  );
}
