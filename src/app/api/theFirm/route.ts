import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const theFirm = req.nextUrl.searchParams.get("theFirm");
    console.log(theFirm);

    const res = await prismadb.anime.findMany({
      where: {
        firm: {
          id: theFirm || "",
        },
      },

      skip: (+(page as string) - 1) * 24,
      take: +(limit as string) || 24,
    });
    const totalPage = res.length;

    // console.log(res[0].animes);

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
