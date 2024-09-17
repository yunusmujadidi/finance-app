import { cn, formatCurrency } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value) {
      const numericValue = Math.abs(parseFloat(value as string));
      setDisplayValue(
        formatCurrency(numericValue)
          .replace(/^Rp\s?/, "")
          .replace(/\./g, ".")
      );
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const parsedValue = parseFloat(value as string);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;
    onChange((parseFloat(value as string) * -1).toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, "");
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue)) {
      onChange((isExpense ? -numericValue : numericValue).toString());
    } else {
      onChange("");
    }
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
          <TooltipContent>
            Use [+] for income and [-] for expense
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="relative">
        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500">
          Rp
        </span>
        <Input
          type="text"
          className="pl-16 pr-4"
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
        />
      </div>
      <p className="text-xs mt-2">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as expense"}
      </p>
    </div>
  );
};
