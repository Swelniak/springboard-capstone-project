import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { createToken, setAuthCookie } from "@/lib/auth";
import User from "@/models/User";

type SignupBody = {
  username?: unknown;
  email?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  const body: SignupBody | null = await request.json().catch(() => null);

  if (!body) {
    return Response.json(
      { error: "Request body must be JSON" },
      { status: 400 },
    );
  }

  const username =
    typeof body.username === "string" ? body.username.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !email || !password) {
    return Response.json(
      { error: "Username, email, and password are required" },
      { status: 400 },
    );
  }

  if (password.length < 8 || password.length > 72) {
    return Response.json(
      { error: "Password must be between 8 and 72 characters" },
      { status: 400 },
    );
  }

  await connectDB();

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return Response.json(
      { error: "That username or email is already taken" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await createToken(user._id.toString());
    await setAuthCookie(token);

    return Response.json(
      {
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const firstMessage =
        Object.values(error.errors)[0]?.message ?? "Invalid signup details";
      return Response.json({ error: firstMessage }, { status: 400 });
    }

    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return Response.json(
        { error: "That username or email is already taken" },
        { status: 409 },
      );
    }

    throw error;
  }
}
