import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const res = await prismadb.genre.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        genre: true,
        des: true,
        thumbnail: true,
        // animes: {
        //   orderBy: {
        //     id: "desc",
        //   },
        //   select: {
        //     thumbnailUrl: true,
        //   },

        //   take: 1,
        // },
      },
    });

    // const distinctGenre = await prismadb.anime.findMany({
    //   distinct: ["thumbnailUrl"],

    //   select: {
    //     thumbnailUrl: true,
    //     genreIds: true,
    //   },
    // });

    // console.log("check", res);

    const resFirm = await prismadb.theFirm.findMany();

    return NextResponse.json(
      {
        data: res,
        dataFirm: resFirm,
        errCode: 0,
        errMes: "get genre explore success!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: [],
        errCode: -1,
        errMes: "Error from server of api/animes!",
      },
      { status: 400 }
    );
  }
}
