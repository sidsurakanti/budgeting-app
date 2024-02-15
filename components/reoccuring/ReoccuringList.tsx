import { auth } from "@/auth";
import { inter } from "@/styles/fonts";

import { type User, type Reoccuring } from "@lib/definitions";
import { fetchReoccuring } from "@lib/data";
import { cn, cashFormatter } from "@lib/utils";
import { badgeColors } from "@lib/colors";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";

export async function ReoccuringList() {
  const session = await auth();
  const user: User = session?.user as User;
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);

  return (
    <>
      <Table>
        {/* columns  */}
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Name</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        {/* rows  */}
        <TableBody>
          {reoccuring.map((transaction, index) => (
            <TableRow key={index} className="h-20 text-md xl:text-lg">
              <TableCell>{transaction.name}</TableCell>

              <TableCell>
                <Badge className="bg-sky-900">{transaction.timeperiod}</Badge>
              </TableCell>

              <TableCell>
                <Badge className={cn(badgeColors[transaction.category])}>
                  {transaction.category}
                </Badge>
              </TableCell>

              <TableCell
                className={cn("text-right font-medium", inter.className)}
              >
                ${cashFormatter(Number(transaction.amount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}