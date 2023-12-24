import {
  signJwtAccessToken,
  signJwtRefeshToken,
  verifyJwt,
} from "@/jwt-protected/jwt";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { token, id, role } = await request.json();
    // console.log("check", token, id, role);

    if (!token && !id && !role)
      return NextResponse.json(
        {
          errorMes: "You are not authenticated",
          errCode: 1,
        },
        {
          status: 400,
        }
      );
    const verified = verifyJwt(
      token as string,
      process.env.JWT_REFRESH_KEY as string
    );
    if (verified) {
      const newAccessToken = signJwtAccessToken({ id: id, role: role });
      // console.log("varify suces");

      return NextResponse.json(
        {
          accessToken: newAccessToken,
          errorCode: 0,
          errorMes: "refresh token success!",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          errorMes: "You are not authenticated",
          errCode: 2,
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
