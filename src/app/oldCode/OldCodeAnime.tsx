import ManageAnime from "@/client/admin/ManageAnime";

export default async function page(props: any) {
  let { searchParams } = props;
  let page = props?.searchParams?.page ?? 1;
  let limit = 6;

  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/manage-animes?page=${page}&&limit=${limit}`,

    {
      method: "GET",
      // cache: "no-store",
      next: { tags: ["manage-animes"] },
    }
  );
  const data = await res.json();
  // console.log(data);

  const genres = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/genres`,

    {
      method: "GET",
      next: { tags: ["genres"] },
    }
  );
  const dataGenres = await genres.json();

  const firms = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/firms`,

    {
      // cache: "no-store",

      method: "GET",
      next: { tags: ["firms"] },
    }
  );
  const dataFirms = await firms.json();

  const releases = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/releases`,

    {
      method: "GET",
      next: { tags: ["releases"] },
    }
  );
  const dataReleases = await releases.json();
  const locales = await fetch(
    `${process.env.HTTP_API_URL}/api/admin/locales`,

    {
      method: "GET",
      next: { tags: ["locales"] },
    }
  );
  const dataLocales = await locales.json();

  return (
    <div className="">
      <ManageAnime
        genres={dataGenres ? dataGenres : []}
        firms={dataFirms ? dataFirms : []}
        releases={dataReleases ? dataReleases : []}
        animes={data?.animes ? data.animes : []}
        locales={dataLocales ? dataLocales : []}
        meta={{
          current: page,
          pageSize: limit,
          total: data?.totalRecord ? data.totalRecord : 1,
        }}
        title={{
          title: "Name Anime",
          des: "Description",
          duration: "Duration",
        }}
      />
    </div>
  );
}
