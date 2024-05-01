"use server";
import { revalidateTag } from "next/cache";
import prismadb from "../../lib/prismadb";
import { cookies } from "next/headers";
import { type } from "os";

export async function saveFavoriteMovie(
  userId: string | undefined,
  movieId: string | null
) {
  //   console.log("check values", userId);
  //   console.log("check values", movieId);

  try {
    const useHaveFavoriteMovie = await prismadb.anime.findUnique({
      where: {
        id: movieId || "",
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    if (useHaveFavoriteMovie) {
      return;
    }
    const userExisting = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    // const animeExisting = await prismadb.anime.findUnique({
    //   where: {
    //     id: movieId || "",
    //   },
    // });

    if (!userExisting) {
      return;
    }

    // console.log("chekc user", userExisting);
    // console.log("chekc anime", animeExisting);
    const connected = await prismadb.user.update({
      where: {
        id: userExisting.id,
      },
      data: {
        favorites: {
          connect: {
            id: movieId ?? "",
          },
        },
      },
    });

    if (connected) {
      revalidateTag("favorite");
      return connected;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFavoriteMovie(userId: string, movieId: string) {
  //   console.log("check values", userId);
  //   console.log("check values", movieId);

  try {
    let useHaveFavoriteMovie = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          disconnect: [{ id: movieId }],
        },
      },
    });
    if (useHaveFavoriteMovie) {
      revalidateTag("favorite");
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deleteAllFavoriteMovie(userId: string) {
  //   console.log("check values", userId);
  //   console.log("check values", movieId);

  try {
    let useHaveFavoriteMovie = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          set: [],
        },
      },
    });
    if (useHaveFavoriteMovie) {
      revalidateTag("favorite");
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function storeMovieWatched(movieId: string) {
  try {
    const res = cookies().get("movieWatched")?.value;
    if (res) {
      let arrRes: string[] = JSON.parse(res);
      if (arrRes.includes(movieId)) {
        return;
      }

      arrRes.push(movieId);
      // console.log("check cookie", arrRes);
      cookies().set({
        name: "movieWatched",
        value: JSON.stringify(arrRes),
        httpOnly: true,
        path: "/",
      });
      revalidateTag("watched");

      return;
    }

    let moviesWatched: string[] = [];
    moviesWatched.push(movieId);
    // console.log("check movie", moviesWatched);
    cookies().set({
      name: "movieWatched",
      value: JSON.stringify(moviesWatched),
      httpOnly: true,
      path: "/",
    });
    // console.log("check cookie3");

    revalidateTag("watched");

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deleteAllMovieWatched() {
  //   console.log("check values", userId);
  //   console.log("check values", movieId);

  try {
    cookies().delete("movieWatched");
    revalidateTag("watched");

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}
let previousUserId: string | null = "";
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addViewVideo(animeId: string, userId: string) {
  try {
    // console.log("minhdz", previousUserId, userId);

    // let user = await prismadb.user.findUnique({
    //   where: {
    //     id: userId,

    //   },
    // });

    // // if (!user) return;

    // setTimeout(async () => {
    //   await prismadb.anime.update({
    //     where: { id: animeId },
    //     data: {
    //       view: (anime?.view as number) + 1,
    //     },
    //   });
    //   revalidateTag("home");
    // }, 10000);
    if (userId === previousUserId) {
      previousUserId = "";
      // delay(3000);
      // console.log("trung user id va doi 10s di ku");
    } else {
      previousUserId = userId;
      // let user = await prismadb.user.findUnique({
      //   where: { id: userId },
      // });
      // console.log("co ne");
      let anime = await prismadb.anime.findUnique({
        where: {
          id: animeId,
        },
      });
      await prismadb.anime.update({
        where: { id: animeId },
        data: {
          view: (anime?.view as number) + 1,
        },
      });

      revalidateTag("home");
      revalidateTag("movie-anime-detail");
    }

    // Wait for 10 seconds before allowing another query
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function likeVideo(animeId: string, userId: string) {
  try {
    let user = await prismadb.user.findUnique({
      where: { id: userId },
    });
    if (!user) return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function disLikeVideo(animeId: string, userId: string) {
  try {
    let user = await prismadb.user.findUnique({
      where: { id: userId },
    });
    if (!user) return;
  } catch (error) {
    console.log(error);
    return;
  }
}
