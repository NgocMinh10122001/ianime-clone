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
        "https://upload.wikimedia.org/wikipedia/vi/8/82/Jujutsu_Kaisen_vol_1_cover.jpeg",
    },
    {
      titleBranch: "Bộ sưu tập",
      desBranch: "Tìm nguồn ảnh gái xinh",
      svg: "collection",
      thumnail:
        "https://upload.wikimedia.org/wikipedia/en/f/f5/Cyber_Hunter_Icon.png",
    },
    {
      titleBranch: "Thể loại",
      desBranch: "Tổng hợp tất cả thể loại",
      svg: "genre",
      thumnail:
        "https://upload.wikimedia.org/wikipedia/vi/c/cb/DotALoadScreen.JPG",
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
