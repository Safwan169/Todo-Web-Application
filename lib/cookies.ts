import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
};

export const setToken = async (token: string, maxAge: number) => {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: maxAge,
  });
};
