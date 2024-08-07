import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const limit = req.nextUrl.searchParams.get("limit");
    const theFirm = req.nextUrl.searchParams.get("theFirm");

    const res = await prismadb.anime.findMany({
      where: {
        firm: {
          id: (theFirm as string) || "",
        },
      },
      skip: (+(page as string) - 1) * 24,
      take: +(limit as string) || 24,
    });
    const totalPage = await prismadb.anime.count({
      where: {
        firm: {
          id: (theFirm as string) || "",
        },
      },
    });
    const theFirmName = await prismadb.theFirm.findUnique({
      where: {
        id: (theFirm as string) || "",
      },
      select: {
        name: true,
      },
    });

    // console.log(res[0].animes);

    return NextResponse.json(
      {
        data: res,
        title: theFirmName?.name,
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
