import AnimeVietSub from "../vietsub/AnimeVietSub";

export default async function page(props: any) {
  const { searchParams } = props;
  const page: string | number = searchParams?.page || 1;
  const limit: number = 24;

  const category: string = searchParams?.category || "";

  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/category?category=${category}&&page=${page}&&limit=${limit}`,
    {
      method: "GET",
      next: { tags: ["category"] },
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
