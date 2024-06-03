import Branch from "@/components/explore/Branch";
import Category from "@/components/explore/Category";
import TheFirm from "@/components/explore/TheFirm";

interface IBranch {
  titleBranch: string;
  desBranch: string;
  svg: string;
  thumnail: string;
}
export default async function page() {
  let branchs: IBranch[] = [
    {
      titleBranch: "Anime Hot",
      desBranch: "Phim nhiều lượt xem nhất",
      svg: "anime",
      thumnail:
        "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/bdbed4e6ca66f10b86f4dbc41db2d5c066ab9168-496x560.jpg?auto=format&fit=fill&q=80&w=496",
    },
    {
      titleBranch: "Bộ sưu tập",
      desBranch: "Tìm nguồn ảnh gái xinh",
      svg: "collection",
      thumnail:
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Seraphine_0.jpg",
    },
    {
      titleBranch: "Thể loại",
      desBranch: "Tổng hợp tất cả thể loại",
      svg: "genre",
      thumnail:
        "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/c1a9aa77bfcc93fbe32e0f2d85168c875ae81bc7-496x560.jpg?auto=format&fit=fill&q=80&w=496",
    },
    {
      titleBranch: "Gacha",
      desBranch: "Thử tí vận may chứ?",
      svg: "gacha",
      thumnail:
        "https://upload.wikimedia.org/wikipedia/vi/0/0a/Genshin_Impact_cover.jpg",
    },
  ];

  const res = await fetch(`${process.env.HTTP_API_URL}/api/explore`, {
    method: "GET",
    // cache: "no-store",
    next: { tags: ["explore"] },
  });
  const data = await res.json();
  return (
    <div
      className="explore__container mtop-64 w-full font-sans"
      style={{ padding: "16px" }}
    >
      <Branch branchs={branchs} />
      <Category genre={data ? data?.data : []} />
      <TheFirm firms={data ? data?.dataFirm : []} />
    </div>
  );
}
