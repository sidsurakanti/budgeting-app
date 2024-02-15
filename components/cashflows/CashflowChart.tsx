import type { Cashflow, Transaction, User } from "@lib/definitions";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import { auth } from "@/auth";
import { Chart } from "@components/cashflows/Chart";

export async function CashflowChart() {
  const session = await auth();
  const user = session?.user as User;

  const cashflows: Cashflow = await fetchCashflows(user);

  // return nothing if there are no cashflows
  if (!cashflows) return <></>;

  // do some calculations for data to pass to the chart
  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);

  // filter transactions into reoccuring and one-time expenses
  const reoccuring: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type === "reoccuring",
  );
  const expenses: Transaction[] = transactionsThisMonth.filter(
    (t) => t.type !== "reoccuring",
  );

  // calculate totals
  const reoccuringTotal: string = reoccuring
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);
  const expensesTotal: string = expenses
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  // calculate balance
  const balance = (
    Number(cashflows.income) -
    Number(expensesTotal) -
    Number(reoccuringTotal)
  ).toFixed(2);

  return (
    <div className="col-span-3">
      {cashflows && (
        <Chart
          income={cashflows.income}
          expenses={expensesTotal}
          reoccuring={reoccuringTotal}
          balance={balance}
        />
      )}
    </div>
  );
}
