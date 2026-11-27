import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { createToken, setAuthCookie } from "@/lib/auth";
import User from "@/models/User";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  const body: LoginBody | null = await request.json().catch(() => null);

  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  await connectDB();

  const user = await User.findOne({ email }).select("+password");
  const passwordMatches = user
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!user || !passwordMatches) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = await createToken(user._id.toString());
  await setAuthCookie(token);

  return Response.json({
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    },
  });
}
