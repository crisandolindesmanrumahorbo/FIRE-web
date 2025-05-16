import { withLinguiPage } from "@/app/hoc/useLingui";
import ActionButton from "../components/ActionButton";
import BuyForm from "../components/BuyForm";
import InitMarket from "../components/InitMarket";
import InitOrder from "../components/InitOrder";
import Orderbook from "../components/Orderbook";
import ProductHeader from "../components/ProductHeader";

type Params = Promise<{ lang: string; symbol: string }>;

const Buy = async (props: { params: Params }) => {
  const { symbol } = await props.params;
  return (
    <InitMarket>
      <InitOrder>
        <>
          <div className="flex flex-col gap-4 mt-2">
            <ProductHeader symbol={symbol} />
            <BuyForm />
            <Orderbook symbol={symbol} />
            <ActionButton symbol={symbol} />
          </div>
        </>
      </InitOrder>
    </InitMarket>
  );
};

export default withLinguiPage(Buy);
