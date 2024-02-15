import { auth } from "@/auth";
import { Suspense } from "react";

import { Skeleton } from "@components/ui/skeleton";
import { type User } from "@lib/definitions";
import { TransactionsPreview } from "@components/dashboard/TransactionsPreview";
import { CashflowPreview } from "@components/dashboard/CashflowPreview";

export default async function Dashboard() {
  const session = await auth();
  // we know that session.user is a user type since
  // they would have been redirected to the login page if they weren't logged in
  const user = session?.user as User;

  return (
    <main className="w-[90%] md:w-5/6 mx-auto grid grid-cols-1 gap-10 xl:grid-cols-4">
      <section>
        <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
          <CashflowPreview user={user} />
        </Suspense>
      </section>

      <section className="xl:col-span-3">
        <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
          <TransactionsPreview user={user} />
        </Suspense>
      </section>
    </main>
  );
}
