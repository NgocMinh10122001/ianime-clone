import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const name = req.nextUrl.searchParams.get("name");
    const firm = req.nextUrl.searchParams.get("firm");
    const release = req.nextUrl.searchParams.get("release");
    const genre = req.nextUrl.searchParams.get("genre");

    // console.log(id);

    const anime = await prismadb.anime.findMany({
      where: {
        id: id || "",
      },
      include: {
        firm: true,
        release: true,
        genres: true,
      },
    });

    const sameName = await prismadb.anime.findMany({
      where: {
        title: {
          contains: name || "",
        },
      },
      include: {
        firm: true,
      },
      take: 5,
    });

    const sameFirm = await prismadb.anime.findMany({
      where: {
        firm: {
          id: firm || "",
        },
      },
      include: {
        firm: true,
      },
      take: 5,
    });

    const sameGenre = await prismadb.anime.findMany({
      where: {
        genres: {
          some: {
            id: genre || "",
          },
        },
      },
      include: {
        firm: true,
      },
      take: 5,
    });

    const sameRelease = await prismadb.anime.findMany({
      where: {
        release: {
          id: release || "",
        },
      },
      include: {
        firm: true,
      },
      take: 5,
    });
    // const res = await prismadb.genre.findMany({
    //   where: { genre: "18+" },
    //   select: {
    //     animes: true,
    //   },
    //   skip: (+(page as string) - 1) * 24,
    //   take: 24,
    // });
    // const totalPage = res[0].animes.length;

    // console.log("check", anime);

    return NextResponse.json(
      {
        anime: anime[0],
        sameName: sameName,
        sameFirm: sameFirm,
        sameGenre: sameGenre,
        sameRelease: sameRelease,
        // totalPage: totalPage,
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
