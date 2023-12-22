import FreshLoad from "@/components/home/FreshLoad";
import { cookies } from "next/headers";
// import NextNProgress from "nextjs-progressbar";

export default async function page() {
  const cookieStore = cookies();
  const cookieToken = cookieStore.get("next-auth.session-token");
  // console.log("check cookie", cookieToken);
  // const res = await fetch(`${process.env.HTTP_API_URL}/api/get-all-users`, {
  //   method: "GET",
  // });
  // const data = await res.json();
  // console.log("check data", data);

  return (
    <div className="">
      {/* <>{console.log("hceck res", res)}</> */}
      <FreshLoad token={cookieToken ? cookieToken : []} />
      <FreshLoad token={cookieToken ? cookieToken : []} />
    </div>
  );
}
