export interface IAnime {
  id: string;
  title: string;
  des: string;
  duration: string | null;
  videoUrl: string;
  thumbnailUrl: string;
  view: number | null;
  rating: number | null;
  localeId: string;
  genreIds: string[];
  firmId: string;
  releaseId: string;
  animeJAId?: string;
  animeENId?: string;
  animeVIId?: string;
}

export interface IGenre {
  id: string;
  genre: string;
  des: string;
}

export interface ITheFirm {
  id: string;
  name: string;
}

export interface IRelease {
  id: string;
  year: number;
}
export interface ILocale {
  id: string;
  locale: string;
  des: string;
}

// export const ReplaceDemand = (
//   orderby: string,
//   order: string,
//   page: string | number
// ) => {
//   const router = useRouter();
//   router.replace(
//     `${process.env.HTTP_API_URL}/orderby=${orderby}&&order=${order}&&page=${page}`
//   );
// };

export interface VideoData {
  kind: string;
  etag: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    contentDetails: {
      duration: string;
    };
  }[];
}

export interface IAnimeName {
  id: string;
  name: string;
}
export interface IDataFetching {
  id: string;
  title: string;
  firmId: string;
  genreIds: string[];
  releaseId: string;
  animeEN: IAnimeName | null;
  animeJA: IAnimeName | null;
  animeVI: IAnimeName | null;
}

export interface IAnimeUpdate {
  id: string;
  key: string;
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
  genres: IGenre[];
  firm: ITheFirm;
  release: IRelease;
  locale: ILocale;
}
