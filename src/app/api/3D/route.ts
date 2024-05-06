import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const res = await prismadb.anime.findMany({
      where: {
        genres: {
          some: {
            genre: "3D",
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
            genre: "3D",
          },
        },
      },
    });

    return NextResponse.json(
      {
        data: res,
        totalPage: totalPage,
        title: "3D",
        errCode: 0,
        errMes: "get genre explore success!",
      },
      { status: 200 }
    );
    // );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: [],
        title: "3D",
        errCode: -1,
        errMes: "Error from server of api/animes!",
      },
      { status: 400 }
    );
  }
}
