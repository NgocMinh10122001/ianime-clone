import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    //   let page: any = await req.nextUrl.searchParams.get("page");
    let limit: any = req.nextUrl.searchParams.get("limit");
    // let genre: any = req.nextUrl.searchParams.get("genre");
    let firm: any = req.nextUrl.searchParams.get("firm");
    // let release: any = req.nextUrl.searchParams.get("release");

    // console.log("check limt", limit);

    let res = await prismadb.anime.findMany({
      where: {
        firm: {
          name: firm as string,
        },
      },
      take: Number(limit),
    });
    // console.log(genre);
    // revalidateTag("manage-animes");
    console.log("check res anime", res);

    return NextResponse.json({
      errCode: 0,
      errMes: "Success",
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      errCode: -1,
      errMes: "Error from server of api/animes!",
    });
  }
}
