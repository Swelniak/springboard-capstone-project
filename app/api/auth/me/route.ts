import { connectDB } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(userId);

  if (!user) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  return Response.json({
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      role: user.role,
    },
  });
}
