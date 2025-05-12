export type Product = {
  symbol: string;
  name: string;
  image: string;
  tag: string[];
};

export const PRODUCTS: Product[] = [
  {
    symbol: "XBTUSD",
    name: "Bitcoin",
    image: "/btc.png",
    tag: ["S", "TL"],
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum",
    image: "/eth.svg",
    tag: ["S"],
  },
  {
    symbol: "SOLUSDT",
    name: "Solana",
    image: "/solana.png",
    tag: ["TB"],
  },
  {
    symbol: "DOGEUSDT",
    name: "Dogecoin",
    image: "/doge.png",
    tag: ["S", "TB"],
  },
  {
    symbol: "SUIUSD",
    name: "Sui",
    image: "/sui.png",
    tag: ["TB", "TL"],
  },
];

export const EXPIRY = [
  { value: "GFD", label: "Good For Day" },
  { value: "GTC", label: "Good Till Cancelled" },
];
