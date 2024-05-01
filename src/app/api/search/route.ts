import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    let orderBy = req.nextUrl.searchParams.get("orderby");
    let order = req.nextUrl.searchParams.get("order");
    let page = req.nextUrl.searchParams.get("page");
    let genre = req.nextUrl.searchParams.get("genre");
    let firm = req.nextUrl.searchParams.get("firm");
    let release = req.nextUrl.searchParams.get("release");
    let name = req.nextUrl.searchParams.get("name");
    // console.log(name);

    // console.log(genre);

    // console.log(req.nextUrl.searchParams);

    const firms = await prismadb.theFirm.findMany();
    const genres = await prismadb.genre.findMany();
    const dates = await prismadb.release.findMany();
    if (orderBy === "new") {
      const res = await prismadb.anime.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  animeEN: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
                {
                  animeJA: {
                    name: {
                      contains: name as string,
                    },
                  },
                },
                {
                  animeVI: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
              ],
            },
            {
              genres: {
                some: {
                  genre: genre ? (genre as string) : {},
                },
              },
            },
            {
              firm: {
                name: firm ? (firm as string) : {},
              },
            },
            {
              release: {
                year: release ? +release : {},
              },
            },
          ],
        },
        orderBy: {
          release: {
            year: "desc",
          },
        },
        skip: (+(page as string) - 1) * 24,
        take: 24,
      });
      const totalPage = await prismadb.anime.count({
        where: {
          AND: [
            {
              OR: [
                {
                  animeEN: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
                {
                  animeJA: {
                    name: {
                      contains: name as string,
                    },
                  },
                },
                {
                  animeVI: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
              ],
            },
            {
              genres: {
                some: {
                  genre: genre ? (genre as string) : {},
                },
              },
            },
            {
              firm: {
                name: firm ? (firm as string) : {},
              },
            },
            {
              release: {
                year: release ? +release : {},
              },
            },
          ],
        },
        orderBy: {
          release: {
            year: "desc",
          },
        },
      });
      // console.log(totalPage);

      return NextResponse.json(
        {
          data: res,
          totalPage: totalPage,
          firms: firms,
          genres: genres,
          dates: dates,
          errCode: 0,
          errMes: "get genre explore success!",
        },
        { status: 200 }
      );
    } else if (orderBy === "az") {
      const res = await prismadb.anime.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  animeEN: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
                {
                  animeJA: {
                    name: {
                      contains: name as string,
                    },
                  },
                },
                {
                  animeVI: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
              ],
            },
            {
              genres: {
                some: {
                  genre: genre ? (genre as string) : {},
                },
              },
            },
            {
              firm: {
                name: firm ? (firm as string) : {},
              },
            },
            {
              release: {
                year: release ? +release : {},
              },
            },
          ],
        },
        orderBy: {
          title: "asc",
        },
        skip: (+(page as string) - 1) * 24,
        take: 24,
      });
      const totalPage = await prismadb.anime.count({
        where: {
          AND: [
            {
              OR: [
                {
                  animeEN: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
                {
                  animeJA: {
                    name: {
                      contains: name as string,
                    },
                  },
                },
                {
                  animeVI: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
              ],
            },
            {
              genres: {
                some: {
                  genre: genre ? (genre as string) : {},
                },
              },
            },
            {
              firm: {
                name: firm ? (firm as string) : {},
              },
            },
            {
              release: {
                year: release ? +release : {},
              },
            },
          ],
        },
        orderBy: {
          release: {
            year: "asc",
          },
        },
      });

      return NextResponse.json(
        {
          data: res,
          totalPage: totalPage,
          firms: firms,
          genres: genres,
          dates: dates,
          errCode: 0,
          errMes: "get genre explore success!",
        },
        { status: 200 }
      );
    } else {
      const res = await prismadb.anime.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  animeEN: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
                {
                  animeJA: {
                    name: {
                      contains: name as string,
                    },
                  },
                },
                {
                  animeVI: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
              ],
            },
            {
              genres: {
                some: {
                  genre: genre ? (genre as string) : {},
                },
              },
            },
            {
              firm: {
                name: firm ? (firm as string) : {},
              },
            },
            {
              release: {
                year: release ? +release : {},
              },
            },
          ],
        },
        orderBy: {
          view: order === "asc" ? "asc" : "desc",
        },
        skip: (+(page as string) - 1) * 24,
        take: 24,
      });
      const totalPage = await prismadb.anime.count({
        where: {
          AND: [
            {
              OR: [
                {
                  animeEN: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
                {
                  animeJA: {
                    name: {
                      contains: name as string,
                    },
                  },
                },
                {
                  animeVI: {
                    name: {
                      contains: (name as string).toLowerCase(),
                    },
                  },
                },
              ],
            },
            {
              genres: {
                some: {
                  genre: genre ? (genre as string) : {},
                },
              },
            },
            {
              firm: {
                name: firm ? (firm as string) : {},
              },
            },
            {
              release: {
                year: release ? +release : {},
              },
            },
          ],
        },
        orderBy: {
          view: order === "asc" ? "asc" : "desc",
        },
      });
      // console.log(res);

      return NextResponse.json(
        {
          data: res,
          totalPage: totalPage,
          firms: firms,
          genres: genres,
          dates: dates,
          errCode: 0,
          errMes: "get genre explore success!",
        },
        { status: 200 }
      );
    }
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
