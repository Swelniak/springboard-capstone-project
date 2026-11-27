import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const AUTH_COOKIE = "savefile_token";
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Missing JWT_SECRET in .env.local");
    return new TextEncoder().encode(secret);
}

export async function createToken(userId: string) {
    return new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(userId)
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecret());
}

export async function verifyToken(token: string) {
    const secret = getSecret();

    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
        return payload.sub ?? null;
    } catch {
        return null;
    }
}

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: ONE_WEEK_IN_SECONDS,
    });
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE);
}

export async function getCurrentUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;

    if (!token) return null;
    return verifyToken(token);
}