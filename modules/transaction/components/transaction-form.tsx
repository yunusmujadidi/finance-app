import React, { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { CalendarIcon, Loader2, Trash } from "lucide-react";

import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Account,
  Categories,
  FinancialAccount,
  Transaction,
} from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { createCategory } from "@/lib/actions/category-actions";
import { toast } from "sonner";
import { AmountInput } from "@/components/amount-input";

const formSchema = z.object({
  amount: z.coerce.number().refine((val) => val !== 0, {
    message: "Please enter a non-zero amount",
  }),
  payee: z.string().min(1, {
    message: "Please enter your recipient",
  }),
  notes: z.string().optional(),
  date: z.date({
    required_error: "Date is required",
  }),
  categoryId: z
    .string()
    .min(1, "Please create or select the category")
    .optional(),
  accountId: z.string().min(1),
});

export type FormValues = z.input<typeof formSchema>;

interface TransactionFormProps {
  defaultValues?: any;
  onDelete?: any;
  id?: string;
  disabled: boolean;
  onSubmit: (values: FormValues) => Promise<void>;
  category: Categories[];
  account: FinancialAccount[];
}

export const TransactionForm = ({
  id,
  defaultValues,
  onDelete,
  onSubmit,
  disabled,
  account,
  category,
}: TransactionFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleDelete = () => {
    setLoading(true);
    onDelete?.();
    form.reset({
      amount: 1,
      payee: "",
      notes: "",
      date: new Date(),
      categoryId: "",
      accountId: "",
    });
    router.refresh();
    setLoading(false);
  };

  const handleCreateCategory = async (name: string) => {
    const result = await createCategory({
      name: name,
    });

    if (result?.success) {
      toast.success("Category created successfully");
    } else {
      toast.error(result?.error);
    }
    router.refresh();
    form.setValue("categoryId", result?.result?.id as string);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Pick your transaction date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recepient</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  defaultValue={defaultValues?.payee}
                  disabled={disabled || loading}
                  placeholder="Enter your recepient..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {account.map((item) => (
                      <SelectItem
                        className="w-full "
                        value={item.id}
                        key={item.id}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                      disabled={disabled}
                    >
                      {field.value
                        ? category.find((cat) => cat.id === field.value)?.name
                        : "Select category..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="flex w-full p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search or Create"
                      onValueChange={setSearchValue}
                    />
                    <CommandList className="w-full">
                      <CommandEmpty>
                        <Button
                          variant="ghost"
                          className="items-start flex w-full justify-start"
                          onClick={() => handleCreateCategory(searchValue)}
                        >
                          <Plus className="size-4 mr-2" />
                          Create &ldquo;{searchValue}&rdquo;
                        </Button>
                      </CommandEmpty>
                      <CommandGroup>
                        {category.map((cat) => (
                          <CommandItem
                            key={cat.id}
                            value={cat.name}
                            onSelect={() => {
                              form.setValue("categoryId", cat.id);
                              setOpen(false);
                            }}
                          >
                            {cat.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  defaultValue={field.value}
                  disabled={disabled}
                  placeholder="Enter the amount of transaction"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled || loading}>
          {loading && <Loader2 className="size-4 animate-spin mr-2" />}
          {id ? "Save changes" : "Create transaction"}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            type="button"
            disabled={disabled || loading}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4 mr-2" /> Delete Transactions
          </Button>
        )}
      </form>
    </Form>
  );
};
