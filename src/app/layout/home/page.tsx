import FreshLoad from "@/components/home/FreshLoad";
import { cookies } from "next/headers";
// import NextNProgress from "nextjs-progressbar";

export default async function page() {
  return (
    <div className="">
      {/* <>{console.log("hceck res", res)}</> */}
      <FreshLoad />
      <FreshLoad />
    </div>
  );
}
