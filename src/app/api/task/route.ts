import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * POST /api/task route for creating a task.
 */
export async function POST(req: Request) {
  const data = await req.json();
  const task = await db.task.create({
    data,
  });
  return NextResponse.json(task);
}

/**
 * DELETE /api/task/:id route for deleting a task.
 */
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const id = data.id;
  await db.task.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ id });
}

/**
 * PUT /api/task/:id route for updating a task.
 */
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const id = data.id;
  const task = await db.task.update({
    where: {
      id,
    },
    data,
  });
  return NextResponse.json(task);
}
