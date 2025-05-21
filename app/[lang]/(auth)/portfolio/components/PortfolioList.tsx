"use client";

import { numberWithCommas } from "@/app/utils/number";
import SubscribeCurrentPrice from "../../transaction/buy/components/SubscribeCurrentPrice";
import { Portfolio } from "../page";
import { useCurrentPrice } from "@/app/store/current-price";

export default function PortfolioList({
  portfolios,
}: {
  portfolios: Portfolio[];
}) {
  const currentPriceMap = useCurrentPrice((state) => state.currentPriceMap);

  return (
    <>
      <div className="mt-4 sm:mx-4 mx-2 sm:p-4 p-2  ">
        <div className="rounded-md overflow-hidden mx-4 mb-14">
          <table className="w-full border-collapse">
            <thead>
              <tr className="">
                <th className="border-x dark:border-gray-800 border-gray-300 w-[20%]">
                  Product
                </th>
                <th className="border-x dark:border-gray-800 border-gray-300 w-[20%]">
                  Current Price/Avg Price
                </th>
                <th className="border-x dark:border-gray-800 border-gray-300 w-[15%]">
                  Lot
                </th>
                <th className="border-x dark:border-gray-800 border-gray-300 w-[25%]">
                  Market/Invested Value
                </th>
                <th className="border-x dark:border-gray-800 border-gray-300 w-[20%]">
                  Unrealized P/L
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((portfolio: Portfolio, i: number) => {
                const price =
                  currentPriceMap[portfolio.product_symbol]?.lastPrice;
                const avg_price = parseFloat(portfolio.avg_price).toFixed(2);

                const market = portfolio.lot * 100 * price;
                const is_green = market > portfolio.invested_value;

                const pl = market - portfolio.invested_value;
                const pl_pctg = (pl / portfolio.invested_value) * 100;
                return (
                  <tr key={i} className="text-center">
                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-start">
                          <p className="font-semibold">
                            {portfolio.product_symbol}
                          </p>
                          <p className="text-xs">{portfolio.product_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-start">
                          <SubscribeCurrentPrice
                            symbol={portfolio.product_symbol}
                          >
                            <p
                              className={`font-semibold ${is_green ? "text-green-400" : "text-red-400"}`}
                            >
                              {`${numberWithCommas(parseFloat(price?.toFixed(2)))}`}
                            </p>
                          </SubscribeCurrentPrice>

                          <p className="text-xs">{avg_price}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-2">{portfolio.lot}</td>
                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-start">
                          <p
                            className={`font-semibold ${is_green ? "text-green-400" : "text-red-400"}`}
                          >
                            {`${numberWithCommas(parseFloat(market?.toFixed(2)))}`}
                          </p>
                          <p className="text-xs dark:text-gray-400 text-gray-600">
                            {portfolio.invested_value}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-start">
                          <p
                            className={`font-semibold ${is_green ? "text-green-400" : "text-red-400"}`}
                          >
                            {`${numberWithCommas(parseFloat(pl?.toFixed(2)))}`}
                          </p>
                          <p
                            className={`text-xs ${is_green ? "text-green-400" : "text-red-400"}`}
                          >
                            {`${numberWithCommas(parseFloat(pl_pctg?.toFixed(2)))}%`}
                          </p>
                        </div>
                      </div>
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
