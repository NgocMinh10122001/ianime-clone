import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const res = await prismadb.anime.findMany({
      where: {
        locale: {
          locale: "vi",
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
        locale: {
          locale: "vi",
        },
      },
    });

    // console.log(res);

    return NextResponse.json(
      {
        data: res,
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
