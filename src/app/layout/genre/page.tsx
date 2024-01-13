import Category from "@/components/explore/Category";

export default async function page() {
  const res = await fetch(`${process.env.HTTP_API_URL}/api/explore`, {
    method: "GET",
    // cache: "no-store",
    next: { tags: ["genreLayout"] },
  });
  const data = await res.json();
  return (
    <div
      className="explore__container container max-w-[1440px] "
      style={{ padding: "16px" }}
    >
      <Category genre={data ? data?.data : []} />
    </div>
  );
}
