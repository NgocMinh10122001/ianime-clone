import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import bcrypt from "bcrypt";
// const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, userName, password } = await request.json();
    // console.log("check data", email, password, userName);

    const existingEmail = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(existingEmail, {
        status: 400,
      });
    }
    console.log("check");

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hceck password", hashedPassword);

    const user = await prismadb.user.create({
      data: {
        email,
        name: userName,
        password: hashedPassword,
        role: "user",
      },
    });
    return NextResponse.json(user, {
      status: 200,
    });
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
