import NavbarSidebar from "@/app/components/NavbarSidebar";
import { getTokenCookies, getUser } from "@/app/utils/cookies";

type Props = {
  children: React.ReactNode;
};

export type Account = {
  balance: number;
  invested_value: number;
};

export default async function Layout(props: Props) {
  const user_cookies = await getUser();
  const user = {
    name: user_cookies.username,
    user_id: user_cookies.sub,
  };
  const { children } = props;
  const token = await getTokenCookies();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(`${process.env.ORDER_URL}/account`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  });
  let account;
  try {
    const data = await response.json();
    account = data.message;
  } catch (e) {
    console.log(e);
  }

  return (
    <NavbarSidebar account={account} user={user}>
      {children}
    </NavbarSidebar>
  );
}
