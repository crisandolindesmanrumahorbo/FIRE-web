import { getTokenCookies } from "@/app/utils/cookies";
import OrderList from "./components/OrderList";

// const orders = [
//   {
//     symbol: "ETHUSD",
//     name: "Ethereum",
//     side: "B",
//     price: 1000,
//     lot: 1,
//     expiry: "GTC",
//     created_at: "2025-05-04T06:22:55.996009Z",
//   },
//   {
//     symbol: "ETHUSD",
//     name: "Ethereum",
//     side: "B",
//     price: 1000,
//     lot: 2,
//     expiry: "GTC",
//     created_at: "2025-05-04T06:23:05.426275Z",
//   },
//   {
//     symbol: "ETHUSD",
//     name: "Ethereum",
//     side: "B",
//     price: 1000,
//     lot: 1,
//     expiry: "GTC",
//     created_at: "2025-05-04T13:21:28.141876Z",
//   },
//   {
//     symbol: "ETHUSD",
//     name: "Ethereum",
//     side: "B",
//     price: 900,
//     lot: 1,
//     expiry: "GTC",
//     created_at: "2025-05-04T13:24:34.196823Z",
//   },
// ];

export type Order = {
  symbol: string;
  name: string;
  side: string;
  price: number;
  lot: number;
  expiry: string;
  created_at: string;
};
export default async function OrderPage() {
  const token = await getTokenCookies();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(`${process.env.ORDER_URL}/order`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  });
  let orders: Order[] = [];
  try {
    const data = await response.json();
    orders = data.message as Order[];
  } catch (e) {
    console.log(e);
  }

  if (response.status !== 200) {
    return <p>Error while get orders</p>;
  }

  return (
    <>
      <OrderList orders={orders} />
    </>
  );
}
