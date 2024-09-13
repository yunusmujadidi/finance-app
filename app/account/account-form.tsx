import React, { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { createAccount } from "@/lib/actions/account-actions";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export type FormValues = z.input<typeof formSchema>;

interface AccountFormProps {
  id?: string;
  defaultValues?: FormValues;
  onDelete?: () => void;
  disabled: boolean;
}

export const AccountForm = ({
  id,
  defaultValues,
  onDelete,
  disabled,
}: AccountFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const result = await createAccount({
      name: values.name,
    });
    setLoading(false);
    if (result.success) {
      toast.success("Account created successfully");
      form.reset({
        name: "",
      });
    } else {
      toast.error(result.error);
    }
    return console.log(result);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled || loading}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled || loading}>
          {loading && <Loader2 className="size-4 animate-spin mr-2" />}{" "}
          {id ? "Save changes" : "Create account"}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            type="button"
            disabled={disabled || loading}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4 mr-2" /> Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};
