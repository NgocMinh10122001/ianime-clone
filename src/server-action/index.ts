"use server";

import { revalidateTag } from "next/cache";
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
    locales,
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
        locale: {
          connect: { id: locales },
        },
      },
    });
    revalidateTag("manage-animes");
  } catch (error) {
    console.log(error);
  }
}

export async function updateNewAnime(values: any, id: string) {
  // console.log(values);

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
    locales,
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
            locale: {
              connect: { id: locales[0].value },
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

export async function searchInputOnChange(values: string) {
  try {
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
    let newValues = values.replace(
      /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g,
      (char) =>
        vietnameseCharacters[char as keyof typeof vietnameseCharacters] || char
    );
    // console.log(newValues);

    let response = await prismadb.anime.findMany({
      where: {
        OR: [
          {
            animeEN: {
              name: {
                contains: newValues || "",
              },
            },
          },
          {
            animeJA: {
              name: {
                contains: newValues || "",
              },
            },
          },
          {
            animeVI: {
              name: {
                contains: newValues || "",
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
      },
      take: 6,
    });

    // console.log(response);
    return response;

    // revalidateTag("search-input-onchange");
  } catch (error) {
    console.log(error);
  }
}
