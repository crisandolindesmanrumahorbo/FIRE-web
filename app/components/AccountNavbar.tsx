import { Account } from "../[lang]/(auth)/layout";
import { numberWithCommas } from "../utils/number";

export default function AccountNavbar({ account }: { account: Account }) {
  if (!account) {
    return <p>Error while get account</p>;
  }
  return (
    <div className="flex gap-2 text-xs sm:text-sm text-gray-200 border border-gray-800 py-2 px-4 rounded-xl font-semibold items-center">
      <p>{`Balance $${numberWithCommas(account.balance)}`}</p>
      <p className="text-gray-800">|</p>
      <p>{`Invested $${numberWithCommas(account.invested_value)}`}</p>
    </div>
  );
}
