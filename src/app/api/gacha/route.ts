import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const random = req.nextUrl.searchParams.get("random");
    const res = await prismadb.anime.findMany({
      orderBy: { id: "asc" },
      take: +(random as string) || 0,
    });

    return NextResponse.json(
      {
        data: res,
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
