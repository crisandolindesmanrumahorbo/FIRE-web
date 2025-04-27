"use client";
import { useCurrentPrice } from "@/app/store/current-price";
import { numberWithCommas } from "@/app/utils/number";
import Avatar from "./Avatar";
import SubscribeCurrentPrice from "./SubscribeCurrentPrice";
import Card from "@/app/components/Card";
import { useRouter } from "next/navigation";

export default function ProductHeader({
  symbol,
  clickable,
}: {
  symbol: string;
  clickable?: boolean;
}) {
  const currentPriceMap = useCurrentPrice((state) => state.currentPriceMap);
  const stock = {
    symbol: symbol,
    name: `Coin ${symbol}`,
    tag: symbol.includes("ETH") ? ["S", "TL"] : ["S", "TB"],
    price: currentPriceMap[symbol]?.lastPrice,
    price_change: currentPriceMap[symbol]?.lastChangePcnt,
    image: "/btc.png",
  };
  const router = useRouter();

  return (
    <SubscribeCurrentPrice symbol={symbol}>
      <Card>
        <div
          className={`flex gap-4 w-full items-center ${clickable ? "cursor-pointer" : ""}`}
          onClick={
            clickable
              ? (e) => {
                  e.stopPropagation();
                  router.push(`/en/transaction/buy/${symbol}`);
                }
              : undefined
          }
        >
          <Avatar path={stock.image} />
          <div className="flex justify-between w-full">
            <div>
              <div className="flex gap-2 items-center">
                <p>{stock.symbol}</p>
                <Tags tags={stock.tag} />
              </div>
              <p>{stock.name}</p>
            </div>
            <div className="text-right">
              <p>$ {numberWithCommas(stock.price)}</p>
              <div
                className={`${
                  stock.price_change < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                <span>{`${(stock.price_change * 100).toFixed(2)}%`}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </SubscribeCurrentPrice>
  );
}

const Tags = ({ tags }: { tags: string[] }) => {
  const TAGS = [
    {
      name: "TB",
      style: (tag: string) => (
        <span key={tag} className="border border-purple-500 h-fit rounded">
          <p className="text-purple-500 text-[10px] items-center py-[2px] mx-1 font-semibold">
            {tag}
          </p>
        </span>
      ),
    },
    {
      name: "TL",
      style: (tag: string) => (
        <span key={tag} className="border border-yellow-700 h-fit rounded">
          <p className="text-yellow-700 text-[10px] items-center py-[2px] mx-2 font-semibold">
            {tag}
          </p>
        </span>
      ),
    },
    {
      name: "S",
      style: (tag: string) => (
        <span key={tag} className="border border-green-700 h-fit rounded">
          <p className="text-green-700 text-[10px] items-center py-[2px] mx-2 font-semibold">
            shariah
          </p>
        </span>
      ),
    },
  ];

  const renderedTags = tags.map((tag: string) => {
    const matchedTag = TAGS.find((t) => tag.includes(t.name));
    return matchedTag ? matchedTag.style(tag) : <div key={tag}>{tag}</div>;
  });

  return <span className="flex gap-1">{renderedTags}</span>;
};
