"use server";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import prismadb from "../../lib/prismadb";

export async function createNewUser(values: any) {
  let { name, email, password, role, image } = values;
  // console.log("check values", values);
  try {
    await prismadb.user.create({
      data: {
        email: email,
        name: name,
        image: image ?? null,
        password: password,
        role: role,
      },
    });
    revalidateTag("manage-user");

    // );
  } catch (error) {
    console.log(error);
  }
}

export async function updateNewUser(values: any, id: string) {
  let { id: string, name, email, password, role, image } = values;
  // console.log("check values", values);
  try {
    await prismadb.user.update({
      where: { id: id },
      data: {
        email: email,
        name: name,
        image: image ?? null,
        password: password,
        role: role,
      },
    });
    revalidateTag("manage-user");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNewUser(id: string) {
  // console.log("check values", values);
  try {
    await prismadb.user.delete({
      where: { id: id },
    });
    revalidateTag("manage-user");
  } catch (error) {
    console.log(error);
  }
}

// export async function createNewAnime(params: type) {}
export async function createNewAnime(values: any) {
  // console.log("check anime", values);

  let {
    title,
    des,
    duration,
    videoUrl,
    thumbnailUrl,
    view,
    rating,
    genre,
    firms,
    releases,
  } = values;
  // console.log("check values", values);

  let genres = genre.map((item: any) => {
    return { id: item };
  });

  try {
    await prismadb.anime.create({
      data: {
        title,
        des,
        duration: duration ?? null,
        videoUrl,
        thumbnailUrl,
        view: +view ?? null,
        rating: +rating ?? null,
        genres: {
          connect: genres,
        },
        firm: {
          connect: { id: firms },
        },
        release: {
          connect: { id: releases },
        },
      },
    });
    revalidateTag("manage-animes");
  } catch (error) {
    console.log(error);
  }
}

export async function updateNewAnime(values: any, id: string) {
  let {
    title,
    des,
    duration,
    videoUrl,
    thumbnailUrl,
    view,
    rating,
    genre,
    firms,
    releases,
  } = values;
  // console.log("check values", values);
  try {
    // let genreAnime = await prismadb.anime.findFirst({
    //   where: { id: id },
    //   select: {
    //     genreIds: true,
    //   },
    // });
    // if (genreAnime?.genreIds[0] !== genre) {
    // }
    let genres = genre.map((item: any) => {
      return { id: item };
    });
    await prismadb.anime
      .update({
        where: { id: id },
        data: {
          genres: {
            set: [],
          },
        },
      })
      .then(async () => {
        await prismadb.anime.update({
          where: { id: id },
          data: {
            title,
            des,
            duration: duration ?? null,
            videoUrl,
            thumbnailUrl,
            view: +view ?? null,
            rating: +rating ?? null,
            genres: {
              connect: genres,
            },
            firm: {
              connect: { id: firms[0].value },
            },
            release: {
              connect: { id: releases[0].value },
            },
          },
        });
      });
    revalidateTag("manage-animes");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNewAnime(id: string) {
  // console.log("check values", values);
  try {
    await prismadb.anime
      .update({
        where: { id: id },
        data: {
          genres: {
            set: [],
          },
        },
      })
      .then(
        async () =>
          await prismadb.anime.delete({
            where: { id: id },
          })
      );

    revalidateTag("manage-animes");
  } catch (error) {
    console.log(error);
  }
}
