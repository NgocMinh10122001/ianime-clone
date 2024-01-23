import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("userId");
    const res = await prismadb.anime.findMany({
      where: {
        userIds: {
          has: id,
        },
      },
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
