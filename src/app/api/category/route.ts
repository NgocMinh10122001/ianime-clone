import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const limit = req.nextUrl.searchParams.get("limit");
    const category = req.nextUrl.searchParams.get("category");

    const res = await prismadb.anime.findMany({
      where: {
        genres: {
          some: {
            id: (category as string) || "",
          },
        },
      },

      skip: (+(page as string) - 1) * 24,
      take: +(limit as string) || 24,
    });
    // const totalPage = res.length;
    const totalPage = await prismadb.anime.count({
      where: {
        genres: {
          some: {
            id: (category as string) || "",
          },
        },
      },
    });
    const genreName = await prismadb.genre.findUnique({
      where: {
        id: (category as string) || "",
      },
      select: {
        genre: true,
      },
    });

    return NextResponse.json(
      {
        data: res,
        title: genreName?.genre,
        totalPage: totalPage,
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
