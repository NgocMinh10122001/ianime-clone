import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  // console.log("hcek req", req.query);

  // let page: any = await req.nextUrl.searchParams.get("page");
  // let limit: any = await req.nextUrl.searchParams.get("limit");

  // let pageNumber: number = await req.body.page;
  // let limitNumber: number = await req.body.limit;
  // das

  // let pageNumber = Number(page);
  // let limitNumber = Number(limit);

  // let { searchParams } = await new URL(req.url);

  // searchParams.set()
  // let page: any = searchParams.get("page");
  // let limit: any = searchParams.get("limit");

  // let itemSkip = (+page - 1) * +limit;

  // console.log("check ", page, limit);

  try {
    // console.log("check ", req.query);
    let totalRecord = await prismadb.user.count();

    let users = await prismadb.user.findMany();
    // console.log("check users", users);

    return NextResponse.json({ users, totalRecord }, { status: 200 });
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
