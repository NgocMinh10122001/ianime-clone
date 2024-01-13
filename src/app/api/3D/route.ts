import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const res = await prismadb.genre.findMany({
      where: { genre: "3D" },
      select: {
        animes: true,
      },
      skip: (+(page as string) - 1) * 24,
      take: 24,
    });
    const totalPage = res[0].animes.length;

    // console.log(res[0].animes);

    return NextResponse.json(
      {
        data: res[0].animes,
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
