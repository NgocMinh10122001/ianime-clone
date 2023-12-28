import Branch from "@/components/explore/Branch";
import Category from "@/components/explore/Category";

export default function page() {
  return (
    <div
      className="explore__container container max-w-[1440px] "
      style={{ padding: "16px" }}
    >
      <Branch />
      <Category />
    </div>
  );
}
