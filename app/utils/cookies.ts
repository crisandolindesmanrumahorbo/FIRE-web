'use server';

import { cookies } from 'next/headers';

type InitCookies = {
  token?: string;
};

export async function initCookies({ token }: InitCookies) {
  const cookieStore = await cookies();

  if (token) {
    cookieStore.set('ACCESS_TOKEN', token);
  }
}

export async function deleteToken() {
  (await cookies()).set('ACCESS_TOKEN', '');
}

export async function getTokenCookies() {
  const cookieStore = await cookies();
  return cookieStore.get('ACCESS_TOKEN')?.value;
}
