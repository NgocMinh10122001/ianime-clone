import Option from "@/components/search/Option";
import TopAnime from "@/components/search/TopAnime";
import { IoPricetags } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdHourglassFull } from "react-icons/md";
export default async function page(props: any) {
  // Option

  let options = [
    {
      svg: (
        // (
        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   fill="none"
        //   viewBox="0 0 24 24"
        //   strokeWidth={1.5}
        //   stroke="currentColor"
        //   className="w-5 h-5 stroke-white"
        // >
        //   <path
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
        //   />
        //   <path
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     d="M6 6h.008v.008H6V6z"
        //   />
        // </svg>
        // )
        <IoPricetags className="w-5 h-5 text-black dark:text-[var(--super-white)]" />
      ),
      title: "genre",
    },
    {
      svg: (
        <FaUserFriends className="w-6 h-6 text-black dark:text-[var(--super-white)]" />
      ),
      title: "firm",
    },
    {
      svg: (
        <MdHourglassFull className="w-5 h-5 text-black dark:text-[var(--super-white)]" />
      ),
      title: "release",
    },
  ];

  // Top anime

  let { searchParams } = props;
  // console.log(searchParams);

  let orderby: string = searchParams?.orderby
    ? searchParams.orderby
    : "max_value_view";
  let order: string = searchParams?.order ? searchParams.order : "desc";
  let genre: string = searchParams?.genre ? searchParams.genre : "";
  let firm: string = searchParams?.firm ? searchParams.firm : "";
  let release: string = searchParams?.release ? searchParams.release : "";
  let name: string = searchParams?.name ? searchParams.name : "";

  let page: string | number = searchParams?.page ? searchParams.page : 1;
  const res = await fetch(
    `${process.env.HTTP_API_URL}/api/search?name=${name}&&orderby=${orderby}&&order=${order}&&genre=${genre}&&firm=${firm}&&release=${release}&&page=${page}`,
    {
      method: "GET",
      next: { tags: ["search"] },
    }
  );
  const data = await res.json();
  return (
    <div className="search__container  w-full mtop-64 padding-x-4 pb-8 relative font-sans">
      <Option
        options={options}
        genres={data ? data.genres : []}
        firms={data ? data.firms : []}
        dates={data ? data.dates : []}
        // page={page as number}
        // genre={genre}
        // firm={firm}
        // release={release}
      />
      <TopAnime
        animes={data ? data.data : []}
        totalPage={data ? data.totalPage : 50}
        page={page as number}
        // orderBy={orderby || ""}
      />
    </div>
  );
}
