import { getTokenCookies } from "@/app/utils/cookies";

type Order = {
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

  const date = (date_str: string) => {
    const date = new Date(date_str);

    // Convert to local timezone (optional: you can also use UTC+7 manually)
    date.setHours(date.getHours() + 7);

    // Format using Intl
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "short", // "May"
      year: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(date);

    const getPart = (type: string) =>
      parts.find((p) => p.type === type)?.value || "";

    return `${getPart("hour")}:${getPart("minute")}:${getPart("second")} ${getPart("day")} ${getPart("month")} ${getPart("year")}`;
  };

  return (
    <div className="mt-4  sm:mx-4 mx-2 sm:p-4 p-2  ">
      <div className="rounded-md overflow-hidden border border-gray-800 mx-4 mb-14">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border border-gray-800">
              <th className="border border-gray-800 w-[15%]">Symbol</th>
              <th className="border border-gray-800 w-[15%]">Name</th>
              <th className="border border-gray-800 w-[15%]">Side</th>
              <th className="border border-gray-800 w-[15%]">Price</th>
              <th className="border border-gray-800 w-[10%]">Lot</th>
              <th className="border border-gray-800 w-[15%]">Expiry</th>
              <th className="border border-gray-800 w-[15%]">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order, i: number) => (
              <tr key={i} className="text-center border">
                <td className="border border-gray-800">{order.symbol}</td>
                <td className="border border-gray-800">{order.name}</td>
                <td className="border border-gray-800">{order.side}</td>
                <td className="border border-gray-800">{order.price}</td>
                <td className="border border-gray-800">{order.lot}</td>
                <td className="border border-gray-800">{order.expiry}</td>
                <td className="border border-gray-800">
                  {date(order.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
