import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const tag = request.nextUrl.searchParams.get("manage-user");
    revalidateTag(tag ?? "manage-user");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log(error);
  }
}
