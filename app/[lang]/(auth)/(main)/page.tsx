import { withLinguiPage } from "@/app/hoc/useLingui";
import InitMarket from "../transaction/buy/components/InitMarket";
import Wathclist from "./components/Watchlist";

type Params = Promise<{ lang: string; symbol: string }>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainPage = async (_props: { params: Params }) => {
  return (
    <InitMarket>
      <Wathclist />
    </InitMarket>
  );
};

export default withLinguiPage(MainPage);
