"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Task } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export function TaskEditDialog({ task }: Readonly<{ task: Task }>) {
  const { toast } = useToast();
  const router = useRouter();

  // Form definition.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      id: task.id,
      title: values.title,
    };
    const res = await fetch("/api/task", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    if (res.ok) {
      toast({
        title: "✅ Task updated successfully!",
      });
      router.refresh();
      form.reset();
    } else {
      toast({
        title: "❌ Task update failed!",
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input value={task.title} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="submit"
                variant="constructive"
                disabled={!form.formState.isDirty || !form.formState.isValid}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
