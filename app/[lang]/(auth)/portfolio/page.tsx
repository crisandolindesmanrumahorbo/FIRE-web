import { getTokenCookies } from "@/app/utils/cookies";
import PortfolioList from "./components/PortfolioList";
import InitMarket from "../transaction/buy/components/InitMarket";

export type Portfolio = {
  lot: number;
  invested_value: number;
  avg_price: string;
  product_name: string;
  product_symbol: string;
};
export default async function OrderPage() {
  const token = await getTokenCookies();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(`${process.env.ORDER_URL}/portfolio`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  });
  let portfolios: Portfolio[] = [];
  try {
    const data = await response.json();
    portfolios = data.message as Portfolio[];
  } catch (e) {
    console.log(e);
  }

  if (response.status !== 200) {
    return <p>Error while get portfolios</p>;
  }

  return (
    <InitMarket>
      <PortfolioList portfolios={portfolios} />
    </InitMarket>
  );
}
