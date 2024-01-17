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

export interface IDataFetching {
  id: string;
  title: string;
}
