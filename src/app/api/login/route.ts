import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
interface IUser {
  id: string;
  name: string;
  password: string;
  accessToken: string;
  role: string;
}
export async function GET(request: NextRequest) {
  const user = <IUser>{
    id: "1",
    name: "minh",
  };
  console.log("check", user);
  return new NextResponse(
    JSON.stringify({
      message: "get user success!",
    }),
    {
      status: 400,
    }
  );
}
