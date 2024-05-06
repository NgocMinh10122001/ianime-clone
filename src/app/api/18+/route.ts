import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const res = await prismadb.anime.findMany({
      where: {
        genres: {
          some: {
            genre: "18+",
          },
        },
      },
      orderBy: {
        release: {
          year: "desc",
        },
      },
      skip: (+(page as string) - 1) * 24,
      take: 24,
    });
    const totalPage = await prismadb.anime.count({
      where: {
        genres: {
          some: {
            genre: "18+",
          },
        },
      },
    });

    // console.log(res[0].animes);

    return NextResponse.json(
      {
        data: res,
        totalPage: totalPage,
        title: "18+",
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
