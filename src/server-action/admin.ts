"use server";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import prismadb from "../../lib/prismadb";
import bcrypt from "bcrypt";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { verifyJwt } from "@/jwt-protected/jwt";
import {
  IAnimeUpdate,
  IGenre,
  ILocale,
  IRelease,
  ITheFirm,
} from "@/types/index";

interface IAnime {
  title: string;
  animeJA: string;
  animeEN: string;
  animeVI: string;
  des: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  view: number;
  rating: number;
  genres: string[];
  firm: string;
  release: string;
  locale: string;
}

export async function searchInputManageUser(values: string) {
  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
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
          vietnameseCharacters[char as keyof typeof vietnameseCharacters] ||
          char
      );
      // console.log(newValues);

      let response = await prismadb.user.findMany({
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
      });

      // console.log(response);
      return {
        response,
        errCode: 0,
        mes: "Find success",
      };
    }
    return {
      errCode: -1,
      mes: "Find failure!,Error from searchInputManageUser",
    };

    // revalidateTag("search-input-onchange");
  } catch (error) {
    console.log(error);
  }
}

export async function createNewAnime(values: IAnime) {
  // let { name, email, password, role, image } = values;
  // console.log("check values", values);

  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
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
      let newValues = values?.animeVI.replace(
        /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g,
        (char: any) =>
          vietnameseCharacters[char as keyof typeof vietnameseCharacters] ||
          char
      );
      let genreIds = values.genres.map((item) => {
        return {
          id: item,
        };
      });
      // console.log("check 1", newValues);
      let existingAnime = await prismadb.anime.findFirst({
        where: {
          title: {
            contains: values.title,
          },
        },
        include: {
          animeEN: true,
          animeJA: true,
          animeVI: true,
        },
      });
      // console.log("check 2", existingAnime);

      if (
        existingAnime &&
        existingAnime.rating === +values.rating
        // existingAnime?.animeEN?.name === values.animeEN ||
        // existingAnime?.animeJA?.name === values.animeJA ||
        // existingAnime?.animeVI?.name === values.animeVI
      )
        return {
          errCode: 1,
          mes: "Create anime failure, error from existingAnime!",
        };
      // console.log("check 3");

      await prismadb.anime.create({
        data: {
          title: values.title,
          des: values.des,
          duration: values.duration,
          videoUrl: values.videoUrl,
          thumbnailUrl: values.thumbnailUrl,
          view: +values.view,
          rating: +values.rating,
          firm: {
            connect: {
              id: values.firm,
            },
          },
          release: {
            connect: {
              id: values.release,
            },
          },
          genres: {
            connect: genreIds,
          },
          locale: {
            connect: {
              id: values.locale,
            },
          },
          animeEN: {
            connectOrCreate: {
              where: {
                name: values.animeEN.toLowerCase(),
              },
              create: {
                name: values.animeEN.toLowerCase(),
              },
            },
            // create: {
            //   name: values.animeEN.toLowerCase(),
            // },
          },
          animeJA: {
            connectOrCreate: {
              where: {
                name: values.animeJA,
              },
              create: {
                name: values.animeJA,
              },
            },
            // create: {
            //   name: values.animeJA,
            // },
          },
          animeVI: {
            connectOrCreate: {
              where: {
                name: newValues.toLowerCase(),
              },
              create: {
                name: newValues.toLowerCase(),
              },
            },
            // create: {
            //   name: newValues.toLowerCase(),
            // },
          },
        },
      });
      revalidateTag("home");
      revalidateTag("search");
      revalidateTag("vietsub");
      revalidateTag("3D");
      revalidateTag("18+");
      revalidateTag("manage-animes");
      return {
        errCode: 0,
        mes: "Create anime success!",
      };
    }
    return {
      errCode: 2,
      mes: "Create anime failure!,Error from deleteNewUser",
    };
    // );
  } catch (error) {
    console.log(error);
    return {
      errCode: 3,
      mes: "Create anime failure!,Error from deleteNewUser",
    };
  }
}

export async function updateAnime(values: IAnime, animeId: string) {
  // console.log(values.id);

  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      let anime = await prismadb.anime.findUnique({
        where: {
          id: animeId,
        },
      });

      if (anime) {
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
        let newValues = values?.animeVI.replace(
          /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g,
          (char: any) =>
            vietnameseCharacters[char as keyof typeof vietnameseCharacters] ||
            char
        );
        await prismadb.anime.update({
          where: {
            id: anime.id,
          },
          data: {
            genres: {
              set: [],
            },
          },
        });
        await prismadb.anime.update({
          where: {
            id: anime.id,
          },
          data: {
            // title: values.title,
            // des: values.des,
            // rating: values.rating,
            ...values,
            view: +values.view,
            rating: +values.rating,
            animeEN: {
              connectOrCreate: {
                where: {
                  name: values.animeEN.toLowerCase(),
                },
                create: {
                  name: values.animeEN.toLowerCase(),
                },
              },
              // create: {
              //   name: values.animeEN.toLowerCase(),
              // },
            },
            animeJA: {
              connectOrCreate: {
                where: {
                  name: values.animeJA,
                },
                create: {
                  name: values.animeJA,
                },
              },
              // create: {
              //   name: values.animeJA,
              // },
            },
            animeVI: {
              connectOrCreate: {
                where: {
                  name: newValues.toLowerCase(),
                },
                create: {
                  name: newValues.toLowerCase(),
                },
              },
              // create: {
              //   name: newValues.toLowerCase(),
              // },
            },
            genres: {
              connect: values.genres.map((item) => {
                return {
                  id: item,
                };
              }),
            },
            firm: {
              connect: { id: values.firm },
            },
            release: {
              connect: { id: values.release },
            },
            locale: {
              connect: {
                id: values.locale,
              },
            },
          },
        });
        // console.log(values);
        revalidateTag("home");
        revalidateTag("search");
        revalidateTag("vietsub");
        revalidateTag("3D");
        revalidateTag("18+");
        revalidateTag("manage-animes");
        return {
          errCode: 0,
          mes: "Update anime success!",
        };
      }

      return {
        errCode: 1,
        mes: "Update anime failure!,Error from deleteNewUser",
      };
    }
    return {
      errCode: 2,
      mes: "Update anime failure!,Error from deleteNewUser",
    };
    // );
  } catch (error) {
    console.log(error);
    return {
      errCode: 3,
      mes: "Update anime failure!,Error from deleteNewUser",
    };
  }
}

export async function deleteAnimeSelected(animeIds: string[]) {
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
            in: animeIds,
          },
        },
      });
      revalidateTag("home");
      revalidateTag("search");
      revalidateTag("vietsub");
      revalidateTag("3D");
      revalidateTag("18+");
      revalidateTag("manage-animes");
      return {
        errCode: 0,
        mes: "Delete animes success!",
      };
    }
    return {
      errCode: -1,
      mes: "Delete animes failure, deleteAnimeSelected!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: 1,
      mes: "Delete anime failure!, ErrorFrom deleteAnimeSelected",
    };
  }
}
export async function deleteAnime(animeId: string) {
  // console.log("check values", values);
  try {
    const session = await getServerSession(options);
    // console.log(session);
    let verifiedToken = verifyJwt(session?.user?.accessToken as string);
    // console.log("verifiedToken", verifiedToken);
    if (verifiedToken?.role === "admin") {
      await prismadb.user.delete({
        where: {
          id: animeId,
        },
      });
      revalidateTag("home");
      revalidateTag("search");
      revalidateTag("vietsub");
      revalidateTag("3D");
      revalidateTag("18+");
      revalidateTag("manage-animes");
      return {
        errCode: 0,
        mes: "Delete anime success!",
      };
    }
    return {
      errCode: -1,
      mes: "Delete failure, deleteAnimeSelected!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: 1,
      mes: "Delete user failure!, ErrorFrom deleteAnimeSelected",
    };
  }
}
