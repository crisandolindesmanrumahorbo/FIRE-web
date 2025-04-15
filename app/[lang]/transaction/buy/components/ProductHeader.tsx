"use client";
import { useCurrentPrice } from "@/app/store/current-price";
import { numberWithCommas } from "@/app/utils/number";
import Card from "../../../../components/Card";
import Avatar from "./Avatar";
import SubscribeCurrentPrice from "./SubscribeCurrentPrice";

export default function ProductHeader({ symbol }: { symbol: string }) {
  const currentPriceMap = useCurrentPrice((state) => state.currentPriceMap);
  const stock = {
    symbol: symbol,
    name: "Bitcoin",
    tag: ["S"],
    price: currentPriceMap[symbol]?.lastPrice,
    price_change: currentPriceMap[symbol]?.lastChangePcnt,
    image: "/btc.png",
  };

  return (
    <SubscribeCurrentPrice symbol={symbol}>
      <Card>
        <div className="flex gap-4 w-full items-center">
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
        <span key={tag} className="border border-[#473B53] h-fit">
          <p className="text-[#473B53] text-[10px] items-center p-[2px]">
            {tag}
          </p>
        </span>
      ),
    },
    {
      name: "TL",
      style: (tag: string) => (
        <span key={tag} className="border border-green-300 h-fit">
          <p className="text-green-300 text-[10px] items-center p-[2px]">
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
