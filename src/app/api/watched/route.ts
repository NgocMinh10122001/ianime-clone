"use server";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import * as _ from "lodash";

export async function GET(req: NextRequest) {
  try {
    const moviesIds = req.cookies.get("movieWatched")?.value;
    // const moives = req.cookies.get("movieWatched");
    // console.log(token);

    if (
      moviesIds &&
      moviesIds.length > 0 &&
      moviesIds !== undefined &&
      moviesIds !== "undefined"
    ) {
      // console.log("check1", moviesIds);

      let moviesWatched: string[] = JSON.parse(moviesIds as string);
      // console.log("check movie2", moviesWatched);

      const res = await prismadb.anime.findMany({
        include: {
          firm: true,
          release: true,
          genres: true,
        },
      });
      const matchingObjects = res.filter((item) =>
        moviesWatched.includes(item.id)
      );

      // Extract id and title from the matching objects
      const result = matchingObjects.map((item) => item);

      // // Output the result
      // console.log("Matching IDs and Titles:", result);

      return NextResponse.json(
        {
          data: result,
          errCode: 0,
          errMes: "get genre explore success!",
        },
        { status: 200 }
      );
    } else {
      // console.log("check2");
      return NextResponse.json(
        {
          data: [],
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
