import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  // console.log("hcek req", req.query);

  try {
    // console.log("check ", req.query);

    let firms = await prismadb.theFirm.findMany();
    // console.log("check users", users);

    return NextResponse.json({ firms }, { status: 200 });
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
