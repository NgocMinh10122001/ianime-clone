import { verifyJwt } from "@/jwt-protected/jwt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get("token");
  try {
    // console.log("check ", req.query);
    if (!accessToken)
      return NextResponse.json({ errorMes: "Unauthenticated!" });
    let verified = verifyJwt(accessToken, process.env.JWT_ACCESS_KEY as string);
    if (verified) {
      let totalRecord = await prismadb.user.count();

      let users = await prismadb.user.findMany();
      // console.log("check users", users);

      return NextResponse.json({ users, totalRecord }, { status: 200 });
    } else return NextResponse.json({ errorMes: "Unauthenticated!" });
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
