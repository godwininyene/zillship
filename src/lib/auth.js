import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // invalid/expired token
  }

  await connectDB();
  const user = await User.findById(decoded.id).select("-password").lean();

  if (!user) return null;

  return {
    ...user,
    _id: user._id.toString(), // convert ObjectId to string
  };
};

export const requireAuth = async (role) => {
  const user = await getCurrentUser();

  if (!user) return { authorized: false };
  if (role && user.role !== role) return { authorized: false, message: 'You do not have the permission to access this route' };

  return { authorized: true, user };
};
