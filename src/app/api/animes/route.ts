import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

interface IAnime {
  id: string;
  title: string;
  des: string;
  duration: string | null;
  videoUrl: string;
  thumbnailUrl: string;
  view: number | null;
  rating: number | null;
  genreIds: string[];
  firmId: string;
  releaseId: string;
}

export async function GET(req: NextRequest) {
  try {
    //   let page: any = await req.nextUrl.searchParams.get("page");
    let limit: any = req.nextUrl.searchParams.get("limit");
    let genre: any = req.nextUrl.searchParams.get("genre");
    // let firm: any = req.nextUrl.searchParams.get("firm");
    // let release: any = req.nextUrl.searchParams.get("release");

    // console.log("check limt", limit);
    if (genre !== "new") {
      const res: IAnime[] = await prismadb.anime.findMany({
        where: {
          genres: {
            some: {
              genre: genre as string,
            },
          },
        },
        take: Number(limit),
      });
      return NextResponse.json({
        data: res,
        errCode: 0,
        errMes: `Success get anime with ${genre}`,
      });
    } else {
      const res: IAnime[] = await prismadb.anime.findMany({
        take: Number(limit),
      });
      // console.log("check res new anime", res);
      return NextResponse.json({
        data: res,
        errCode: 0,
        errMes: "Success get anime new",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      data: [],
      errCode: -1,
      errMes: "Error from server of api/animes!",
    });
  }
}
