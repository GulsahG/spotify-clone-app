import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

interface JwtPayload {
  id: number;
}
export const validateRoute = (
  handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>, arg2: User) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user: User;

      try {
        const { id } = jwt.verify(token, "hello") as JwtPayload;
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("This is not a real user");
        }
      } catch (err) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, "hello") as JwtPayload;
  return user;
};
