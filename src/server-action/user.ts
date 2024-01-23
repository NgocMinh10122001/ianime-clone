"use server";
import { revalidateTag } from "next/cache";
import prismadb from "../../lib/prismadb";

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
