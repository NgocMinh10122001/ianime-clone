import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface SignOption {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};
const REFESH_SIGN_OPTION: SignOption = {
  expiresIn: "30d",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secretKey = process.env.JWT_ACCESS_KEY;
  const accessToken = jwt.sign(payload, secretKey as string, options);
  // console.log("hckce asss", accessToken);

  return accessToken;
}

export function signJwtRefeshToken(
  payload: JwtPayload,
  options: SignOption = REFESH_SIGN_OPTION
) {
  // console.log("hckce asss 2");

  const secretKey = process.env.JWT_REFRESH_KEY;
  const refreshToken = jwt.sign(payload, secretKey as string, options);
  return refreshToken;
}

export function verifyJwt(token: string) {
  try {
    let secretKey = process.env.JWT_ACCESS_KEY;
    let decoded = jwt.verify(token, secretKey as string);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
  }
}

export function verifyJwtRefresh(token: string) {
  try {
    let secretKey = process.env.JWT_REFRESH_KEY;
    let decoded = jwt.verify(token, secretKey as string);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
  }
}

// export function requestRefeshToken(req, res) {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.status(400).json("You are not authenticated");
//   const verified = verifyJwt(
//     refreshToken,
//     process.env.JWT_REFRESH_KEY as string
//   );
//   if (verified) {
//     const newAccessToken = signJwtAccessToken({});
//     const newRefreshToken = signJwtRefeshToken({});

//     res.status(200).json({ accessToken: newAccessToken });
//   }
// }
