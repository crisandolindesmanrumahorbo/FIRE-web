"use server";

import { cookies } from "next/headers";

type InitCookies = {
  token?: string;
};

export async function initCookies({ token }: InitCookies) {
  const cookieStore = await cookies();

  if (token) {
    cookieStore.set("ACCESS_TOKEN", token);
  }
}

export async function deleteToken() {
  (await cookies()).set("ACCESS_TOKEN", "");
}

export async function getTokenCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("ACCESS_TOKEN")?.value;
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("ACCESS_TOKEN")?.value || "";
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(payload);
  } catch (err) {
    console.error("Failed to decode JWT", err);
    return null;
  }
}
