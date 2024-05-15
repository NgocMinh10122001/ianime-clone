import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const limit = req.nextUrl.searchParams.get("limit");
    const release = req.nextUrl.searchParams.get("release");
    // console.log(page, limit, category);

    const res = await prismadb.anime.findMany({
      where: {
        release: {
          id: (release as string) || "",
        },
      },

      skip: (+(page as string) - 1) * 24,
      take: +(limit as string) || 24,
    });
    const totalPage = await prismadb.anime.count({
      where: {
        release: {
          id: (release as string) || "",
        },
      },
    });
    const releaseName = await prismadb.release.findUnique({
      where: {
        id: (release as string) || "",
      },
      select: {
        year: true,
      },
    });

    // console.log(res[0].animes);

    return NextResponse.json(
      {
        data: res,
        title: releaseName?.year,
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
