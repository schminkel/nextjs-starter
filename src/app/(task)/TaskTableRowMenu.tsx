"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { TaskEditDialog } from "./TaskEditDialog";
import { Task } from "@/types/task";
import { TaskDeleteDialog } from "./TaskDeleteDialog";

enum DialogState {
  Closed,
  Edit,
  Delete,
}

export function TaskTableRowMenu({ task }: Readonly<{ task: Task }>) {
  const [dialogState, setDialogState] = useState(DialogState.Closed);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => {
                setDialogState(DialogState.Edit);
              }}
            >
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => {
                setDialogState(DialogState.Delete);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContentSwitch />
    </Dialog>
  );

  function DialogContentSwitch() {
    switch (dialogState) {
      case DialogState.Edit:
        return <TaskEditDialog task={task} />;
      case DialogState.Delete:
        return <TaskDeleteDialog task={task} />;
      default:
        return null;
    }
  }
}
