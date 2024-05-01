import FreshLoad from "@/components/home/FreshLoad";

interface INestProps {
  limit: number;
  genre: string;
  title: string;
}

export default async function page() {
  let nestProps = [
    {
      limit: 12,
      genre: "new",
      title: "Mới tải lên",
    },
    {
      limit: 12,
      genre: "comedy",
      title: "Hài hước",
    },
    {
      limit: 12,
      genre: "romance",
      title: "Tình cảm",
    },
    {
      limit: 12,
      genre: "commingsoon",
      title: "Sắp phát sóng",
    },
  ];
  const res = await fetch(`${process.env.HTTP_API_URL}/api/animes`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    method: "GET",
    next: { tags: ["home"] },
    // cache: "no-store",
  });
  const data = await res.json();
  // console.log(data);
  //
  return (
    <div className="w-full h-fit mtop-64 ">
      <FreshLoad
        animes={data?.animeNew || []}
        genreId={"new"}
        title={"Mới tải lên"}
      />
      <FreshLoad
        animes={data?.animeComedy[0]?.animes || []}
        genreId={data?.animeComedy[0]?.genre || ""}
        title={"Hài hước"}
      />
      <FreshLoad
        animes={data?.animeRomance[0]?.animes || []}
        genreId={data?.animeRomance[0]?.genre || ""}
        title={"Tình cảm"}
      />
      <FreshLoad
        animes={data?.animeCommingsoon[0]?.animes || []}
        genreId={data?.animeCommingsoon[0]?.genre || ""}
        title={"Sắp phát sóng"}
      />
    </div>
  );
}
