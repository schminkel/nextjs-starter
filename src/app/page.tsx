import Image from "next/image";
import React from "react";
import { db } from "@/lib/db";
import { Task } from "@/types/task";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home(): Promise<React.JSX.Element> {
  const tasks: Task[] = await db.task.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-600 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-50 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          alt="Next.js Logo"
          className="relative dark:drop-shadow-[0_0_0.4rem_#ffffff90] dark:invert"
          height={37}
          src="/next.svg"
          width={180}
          priority
        />
      </div>

      <div className="pt-16">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-96 font-bold">Id</TableHead>
              <TableHead className="w-96 font-bold">Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
