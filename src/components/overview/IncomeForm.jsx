import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/utils/helpers";
import useDataStore from "@/hooks/useDataStore";
import { Button } from "../ui/button.jsx";
import { toast } from "sonner";

const formSchema = z.object({ pay: z.number().positive() });

export default function IncomeForm() {
  const { pay, updatePay } = useDataStore();

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { pay },
  });

  const { reset, control } = formMethods;

  function onSubmit(data) {
    updatePay(data.pay);
    toast("Income update notification", {
      description: `Income has successfully been updated to $ ${formatNumber(
        data.pay
      )}`,
    });
    reset({ pay: data.pay });
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-12 lg:gap-y-24 p-8 h-full rounded-md bg-lighterBackground"
      >
        <div className="flex justify-between w-full">
          <h2 className="text-2xl text-input">Insert your monthly income</h2>
        </div>
        <FormField
          control={control}
          name="pay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Income in $</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Your current income in $"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? parseFloat(value) : 0);
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter your monthly income to help us calculate your spending goals.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Update income
        </Button>
      </form>
    </FormProvider>
  );
}
