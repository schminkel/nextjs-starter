import { Task } from "@prisma/client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function TaskDeleteDialog({ task }: Readonly<{ task: Task }>) {
  const { toast } = useToast();
  const router = useRouter();

  /**
   * Deletes a task.
   */
  async function onDelete(id: string) {
    const body = {
      id,
    };
    const res = await fetch("/api/task", {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast({
        title: "✅ Task deleted successfully!",
      });
      router.refresh();
    } else {
      toast({
        title: "❌ Task deletion failed!",
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Do you want to delete this task?</DialogTitle>
        <div className="pb-2 pt-3.5">
          <table className="text-sm text-muted-foreground">
            <tbody>
              <tr className="h-6">
                <td className="w-14 font-bold">Id:</td>
                <td>{task.id}</td>
              </tr>
              <tr className="h-6">
                <td className="font-bold">Title:</td>
                <td>{task.title}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogHeader>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
