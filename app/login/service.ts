'use server';

export const login = async (username: string, password: string) => {
  const body = JSON.stringify({
    username,
    password,
  });
  const response = await fetch(`${process.env.BASE_URL}/login`, {
    method: 'POST',
    body,
  });
  if (response.status >= 200 && response.status < 300) {
    const data = await response.json();
    return { data, error: null };
  }
  if (response.status >= 400 && response.status < 500) {
    return { data: null, error: 'credential is wrong' };
  }
  return { data: null, error: 'server have problem,' };
};
