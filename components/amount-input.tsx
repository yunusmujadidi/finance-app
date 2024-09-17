import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
export const AmountInput = ({
  defaultValue,
  disabled,
  value,
  placeholder,

  onChange,
}: {
  defaultValue: any;
  disabled: boolean;
  value: string | number;
  placeholder?: string;
  onChange: (value: string) => void;
}) => {
  const parsedValue = parseFloat(value as string);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;

    onChange((parseFloat(value as string) * -1).toString());
  };
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "absolute bg-slate-400 hover:bg-slate-500 top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition z-10",

                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600"
              )}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>Use [+] or income and [-] for expense</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Input
        type="number"
        className="pl-10"
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={2147483647}
        min={-2147483648}
      />
      <p className="text-xs mt-2">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as expense"}
      </p>
    </div>
  );
};
