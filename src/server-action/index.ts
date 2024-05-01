"use server";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import prismadb from "../../lib/prismadb";
import bcrypt from "bcrypt";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { verifyJwt } from "@/jwt-protected/jwt";
import { IDataFetching } from "@/types/index";

interface IUser {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  image?: string;
  role: string;
}

export async function getUser(userId: string) {
  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      let user = await prismadb.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
        },
      });

      let hashedPassword = await bcrypt.hash(user?.password as string, 12);

      return {
        data: {
          ...user,
          password: hashedPassword,
        },
        errCode: 0,
        mes: "Create user success!",
      };
    }
    return {
      errCode: -1,
      mes: "Create user failure!,Error from deleteNewUser",
    };
    // );
  } catch (error) {
    console.log(error);
    return {
      errCode: 1,
      mes: "Create user failure!,Error from deleteNewUser",
    };
  }
}

export async function createNewUser(values: IUser) {
  // let { name, email, password, role, image } = values;
  // console.log("check values", values);

  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      let userExisting = await prismadb.user.findUnique({
        where: {
          email: values?.email,
        },
      });
      if (userExisting) return;

      const hashedPassword = await bcrypt.hash(values?.password, 12);
      await prismadb.user.create({
        data: {
          name: values?.name,
          email: values?.email,
          password: hashedPassword,
          role: values?.role,
        },
      });

      revalidateTag("manage-user");
      return {
        errCode: 0,
        mes: "Create user success!",
      };
    }
    return {
      errCode: -1,
      mes: "Create user failure!,Error from deleteNewUser",
    };
    // );
  } catch (error) {
    console.log(error);
    return {
      errCode: 1,
      mes: "Create user failure!,Error from deleteNewUser",
    };
  }
}

export async function updateUser(values: IUser, userId: string) {
  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      let user = await prismadb.user.findUnique({
        where: {
          id: userId,
        },
      });
      let verifyPassword = await bcrypt.compare(
        values.oldPassword,
        user?.password as string
      );
      if (verifyPassword) {
        const hashedPassword = await bcrypt.hash(values?.password, 12);
        await prismadb.user.update({
          where: {
            id: userId,
          },
          data: {
            name: values?.name,
            email: values?.email,
            password: hashedPassword,
            role: values?.role,
          },
        });

        revalidateTag("manage-user");
        return {
          errCode: 0,
          mes: "Update user success!",
        };
      }

      return {
        errCode: 1,
        mes: "Update user failure!,Error from deleteNewUser",
      };
    }
    return {
      errCode: 2,
      mes: "Update user failure!,Error from deleteNewUser",
    };
    // );
  } catch (error) {
    console.log(error);
    return {
      errCode: 3,
      mes: "Update user failure!,Error from deleteNewUser",
    };
  }
}

export async function deleteUserSelected(userIds: string[]) {
  // console.log("check values", values);
  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      await prismadb.user.deleteMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      revalidateTag("manage-user");
      return {
        errCode: 0,
        mes: "Delete success!",
      };
    }
    return {
      errCode: -1,
      mes: "Delete failure!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: 1,
      mes: "Delete user failure!, ErrorFrom deleteNewUser",
    };
  }
}
export async function deleteUser(userId: string) {
  // console.log("check values", values);
  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      await prismadb.user.delete({
        where: {
          id: userId,
        },
      });

      revalidateTag("manage-user");
      return {
        errCode: 0,
        mes: "Delete success!",
      };
    }
    return {
      errCode: -1,
      mes: "Delete failure!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: 1,
      mes: "Delete user failure!, ErrorFrom deleteNewUser",
    };
  }
}

// export async function createNewAnime(params: type) {}
// export async function createNewAnime(values: any) {
//   // console.log("check anime", values);

//   let {
//     title,
//     des,
//     duration,
//     videoUrl,
//     thumbnailUrl,
//     view,
//     rating,
//     genre,
//     firms,
//     releases,
//     locales,
//   } = values;
//   // console.log("check values", values);

//   let genres = genre.map((item: any) => {
//     return { id: item };
//   });

//   try {
//     await prismadb.anime.create({
//       data: {
//         title,
//         des,
//         duration: duration ?? null,
//         videoUrl,
//         thumbnailUrl,
//         view: +view ?? null,
//         rating: +rating ?? null,
//         genres: {
//           connect: genres,
//         },
//         firm: {
//           connect: { id: firms },
//         },
//         release: {
//           connect: { id: releases },
//         },
//         locale: {
//           connect: { id: locales },
//         },
//       },
//     });
//     revalidateTag("manage-animes");
//   } catch (error) {
//     console.log(error);
//   }
// }

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
    // console.log(values);

    let response = await prismadb.anime.findMany({
      where: {
        OR: [
          {
            animeEN: {
              name: {
                contains: values.toLowerCase(),
              },
            },
          },
          {
            animeJA: {
              name: {
                contains: values,
              },
            },
          },
          {
            animeVI: {
              name: {
                contains: newValues.toLowerCase(),
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        firmId: true,
        genreIds: true,
        releaseId: true,
        animeEN: true,
        animeJA: true,
        animeVI: true,
      },
      take: 6,
    });

    const res = getUniqueBooksByTitle(response);
    // console.log(uniqueBooks);
    // console.log(response);
    return res;

    // revalidateTag("search-input-onchange");
  } catch (error) {
    console.log(error);
  }
}

function getUniqueBooksByTitle(books: IDataFetching[]): IDataFetching[] {
  const uniqueTitles = new Set(books.map((book) => book.title));
  const uniqueBooks: IDataFetching[] = [];
  uniqueTitles.forEach((title) => {
    const book = books.find((book) => book.title === title);
    if (book) {
      uniqueBooks.push(book);
    }
  });
  return uniqueBooks;
}
