import { EXPIRY } from "@/app/constants/product";
import { Order } from "../page";

export default function OrderList({ orders }: { orders: Order[] }) {
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

    return [
      `${getPart("hour")}:${getPart("minute")}:${getPart("second")}`,
      `${getPart("day")} ${getPart("month")} ${getPart("year")}`,
    ];
  };
  return (
    <>
      <div className="mt-4 sm:mx-4 mx-2 sm:p-4 p-2  ">
        <div className="rounded-md overflow-hidden mx-4 mb-14">
          <table className="w-full border-collapse">
            <thead>
              <tr className="">
                <th className="border-x border-gray-800 dark:border-gray-300 w-[20%]">
                  Product
                </th>
                <th className="border-x border-gray-800 dark:border-gray-300 w-[10%]">
                  Side
                </th>
                <th className="border-x border-gray-800 dark:border-gray-300 w-[15%]">
                  Price
                </th>
                <th className="border-x border-gray-800 dark:border-gray-300 w-[10%]">
                  Lot
                </th>
                <th className="border-x border-gray-800 dark:border-gray-300 w-[15%]">
                  Expiry
                </th>
                <th className="border-x border-gray-800 dark:border-gray-300 w-[20%]">
                  Date
                </th>
                <th className="border-x border-gray-800 dark:border-gray-300 w-[10%]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order, i: number) => {
                const created_at = date(order.created_at);
                const is_buy = order.side === "B";
                const expiry = EXPIRY.find(
                  (expiry) => expiry.value === order.expiry,
                );
                return (
                  <tr key={i} className="text-center">
                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-start">
                          <p className="font-semibold">{order.symbol}</p>
                          <p className="text-xs">{order.name}</p>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`p-2 font-semibold ${is_buy ? "text-green-500 dark:text-green-800" : "text-red-400"}`}
                    >
                      {is_buy ? "Buy" : "Sell"}
                    </td>

                    <td className="p-2">{order.price}</td>
                    <td className="p-2">{order.lot}</td>
                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-start">
                          <p>{expiry?.value}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-600">
                            {expiry?.label}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-start">
                          <p>{created_at[0]}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-600">
                            {created_at[1]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold p-2 text-green-500 dark:text-green-600">
                      Match
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
