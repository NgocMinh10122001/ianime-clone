import { verifyJwt } from "@/jwt-protected/jwt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get("token");
  let page = req.nextUrl.searchParams.get("page") || 1;
  let limit = req.nextUrl.searchParams.get("limit");
  let search = req.nextUrl.searchParams.get("search");
  try {
    // console.log("check ", req.query);
    if (!accessToken)
      return NextResponse.json({ errCode: 1, mes: "Unauthenticated!" });
    let verified = verifyJwt(accessToken);
    if (verified) {
      if (search) {
        const vietnameseCharacters: Record<string, string> = {
          à: "a",
          á: "a",
          ả: "a",
          ã: "a",
          ạ: "a",
          ă: "a",
          ằ: "a",
          ắ: "a",
          ẳ: "a",
          ẵ: "a",
          ặ: "a",
          â: "a",
          ầ: "a",
          ấ: "a",
          ẩ: "a",
          ẫ: "a",
          ậ: "a",
          è: "e",
          é: "e",
          ẻ: "e",
          ẽ: "e",
          ẹ: "e",
          ê: "e",
          ề: "e",
          ế: "e",
          ể: "e",
          ễ: "e",
          ệ: "e",
          ì: "i",
          í: "i",
          ỉ: "i",
          ĩ: "i",
          ị: "i",
          ò: "o",
          ó: "o",
          ỏ: "o",
          õ: "o",
          ọ: "o",
          ô: "o",
          ồ: "o",
          ố: "o",
          ổ: "o",
          ỗ: "o",
          ộ: "o",
          ơ: "o",
          ờ: "o",
          ớ: "o",
          ở: "o",
          ỡ: "o",
          ợ: "o",
          ù: "u",
          ú: "u",
          ủ: "u",
          ũ: "u",
          ụ: "u",
          ư: "u",
          ừ: "u",
          ứ: "u",
          ử: "u",
          ữ: "u",
          ự: "u",
          ỳ: "y",
          ý: "y",
          ỷ: "y",
          ỹ: "y",
          ỵ: "y",
          đ: "d",
        };
        let newValues = search.replace(
          /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g,
          (char) =>
            vietnameseCharacters[char as keyof typeof vietnameseCharacters] ||
            char
        );
        let totalRecord = await prismadb.user.count({
          where: {
            name: {
              contains: newValues,
            },
          },
        });

        let users = await prismadb.user.findMany({
          where: {
            name: {
              contains: newValues,
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },

          take: +(limit as string) ?? 6,
          skip: (+(page as string) - 1) * +(limit as string),
        });
        // console.log("check users", users);

        return NextResponse.json(
          {
            users,
            totalRecord,
            errCode: 0,
            mes: "get user by search success!",
          },
          { status: 200 }
        );
      }
      let totalRecord = await prismadb.user.count();

      let users = await prismadb.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        take: +(limit as string) ?? 6,
        skip: (+(page as string) - 1) * +(limit as string),
      });
      // console.log("check users", users);

      return NextResponse.json(
        { users, totalRecord, errCode: 0, mes: "get users success!" },
        { status: 200 }
      );
    } else return NextResponse.json({ errCode: 2, mes: "Unauthenticated!" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        errCode: 3,
        message: "Error from server",
      },
      { status: 400 }
    );
  }
}
