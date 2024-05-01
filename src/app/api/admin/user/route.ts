import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    let data = await req.json();
    const path = req.nextUrl.searchParams.get("path");
    console.log(path);

    // console.log("check ", req.query);
    let userExisting = await prismadb.user.findUnique({
      where: {
        email: data?.email,
      },
    });
    if (userExisting)
      return NextResponse.json(
        { errCode: 1, mes: "user existed!" },
        { status: 200 }
      );

    const hashedPassword = await bcrypt.hash(data?.password, 12);
    await prismadb.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    revalidatePath(path as string);

    return NextResponse.json(
      {
        revalidated: true,
        errCode: 0,
        mes: "create a new user success!",
      },
      {
        status: 200,
      }
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
