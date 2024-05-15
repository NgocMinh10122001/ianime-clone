import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const anime = await prismadb.anime.findUnique({
      where: {
        id: (id as string) || "",
      },
      include: {
        firm: true,
        release: true,
        genres: true,
        animeJA: true,
        animeVI: true,
      },
    });
    // console.log(anime);

    const sameName = await prismadb.anime.findMany({
      where: {
        title: {
          contains: anime?.title || "",
        },
        NOT: {
          id: id as string,
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
          id: anime?.firm.id || "",
        },
        NOT: {
          id: id as string,
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
            id: anime?.genres[0].id || "",
          },
        },
        NOT: {
          id: id as string,
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
          id: anime?.release.id || "",
        },
        NOT: {
          id: id as string,
        },
      },
      include: {
        firm: true,
      },
      take: 5,
    });

    revalidateTag("movie-anime-detail");

    return NextResponse.json(
      {
        anime: anime,
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
