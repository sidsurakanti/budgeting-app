import type { User } from "@lib/definitions";
import { cashFormatter } from "@lib/utils";
import { fetchTransactions } from "@lib/data";

import { RecentTransactionsList } from "@components/cashflows/RecentTransactionsList";
import { Button } from "@components/ui/button";
import { ViewMore } from "@components/ui/icons";

import { auth } from "@/auth";
import Link from "next/link";


export async function TransactionsPreview() {
  const session = await auth();
  const user = session?.user as User;
  const transactions = await fetchTransactions(user);

  const recentTotal = transactions
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="bg-accent/75 text-foreground border border-border rounded-lg p-5 flex flex-col gap-5 shadow-md">
      <header className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground tracking-wide">Recents</p>
          <span className="text-4xl font-medium flex">
            <p className="text-muted-foreground">
              {cashFormatter(Number(recentTotal)).split("$")[0]}$
            </p>
            {cashFormatter(Number(recentTotal)).split("$")[1]}
          </span>
        </div>

        <span>
          <Link href="/transactions">
            <Button>
              <p className="hidden md:block">view all</p>
              <ViewMore className="md:hidden" height={17} width={17} />
            </Button>
          </Link>
        </span>
      </header>

      <RecentTransactionsList transactions={transactions} />
    </section>
  );
}
