// middlewares/corsMiddleware.ts
import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const corsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) => {
  await NextCors(req, res, {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: "*", // Specify allowed origins or use a wildcard '*'
    optionsSuccessStatus: 200,
  });

  next(req, res);
};

export default corsMiddleware;
