import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user: {
    email: string;
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    password?: string;
  };

  try {
    user = await prisma.user.create({
      data: { email: email, password: bcrypt.hashSync(password, salt) },
    });
  } catch (err) {
    res.status(401);
    res.json({ error: "User already exists" });
    return;
  }

  // token: String
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("TRAX_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};
