import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  // console.log("hcek req", req.query);

  //   let page: any = await req.nextUrl.searchParams.get("page");
  //   let limit: any = await req.nextUrl.searchParams.get("limit");

  try {
    // console.log("check ", req.query);
    let totalRecord = await prismadb.anime.count();

    let animes = await prismadb.anime.findMany({
      include: {
        genres: true,
        firm: true,
        release: true,
        locale: true,
      },
    });

    return NextResponse.json(
      { animes, totalRecord, errCode: 0, errMes: "Success!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Error from server",
      },
      { status: 400 }
    );
  }
}
