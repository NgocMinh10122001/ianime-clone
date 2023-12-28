import Option from "@/components/search/Option";
import TopAnime from "@/components/search/TopAnime";

export default function page() {
  return (
    <div className="search__container container max-w-[1440px] pb-8">
      <Option />
      <TopAnime />
    </div>
  );
}
