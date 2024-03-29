import { auth } from "@/auth";

import type { User, Reoccuring } from "@lib/definitions";
import { fetchReoccuring } from "@lib/data";
import { cn } from "@lib/utils";
import { badgeColors } from "@lib/colors";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { ScrollArea } from "@components/ui/scroll-area";

export async function ReoccuringPreview() {
  const session = await auth();
  const user: User = session?.user as User;
  const reoccuring: Reoccuring[] = await fetchReoccuring(user);

  return (
    <>
      {/* make sure table is scrollable  */}
      <ScrollArea className="h-[380px] shadow-md rounded-lg border border-border">
        <Table>
          <TableCaption>Reoccuring transactions</TableCaption>

          {/* columns  */}
          {/* stop header from being scrolled */}
          <TableHeader className="sticky top-0 bg-secondary">
            <TableRow className="h-12">
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Frequency</TableHead>
              <TableHead className="text-right">Category</TableHead>
            </TableRow>
          </TableHeader>

          {/* rows  */}
          <TableBody className="bg-accent">
            {reoccuring.map((transaction, index) => (
              <TableRow key={index} className="h-20 text-md xl:text-lg">
                <TableCell className="font-medium text-lg">
                  {transaction.name}
                </TableCell>

                <TableCell className="text-center">
                  <Badge className="bg-sky-700">{transaction.timeperiod}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Badge className={cn(badgeColors[transaction.category])}>
                    {transaction.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
