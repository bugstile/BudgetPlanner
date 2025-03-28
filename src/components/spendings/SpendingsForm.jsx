import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getTodayString } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import useEditStore from "@/hooks/useEditStore";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDataStore from "@/hooks/useDataStore";
import CatButton from "../ui/cat-button";

// Updated Schema for Validation
const formSchema = z.object({
  spendingCategory: z
    .string()
    .refine(value => value !== "", { message: "Spending category must be selected." }), // Ensure spendingCategory is selected
  dateSpent: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date of expense must be a valid date",
  }),
  totalAmount: z.number().positive(),
});

export default function SpendingsForm({ editingExpense }) {
  const { addExpense, editExpense } = useDataStore();
  const { updateEditingExpense } = useEditStore();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get categories from localStorage
    const storedData = localStorage.getItem("react_dashboard_data_key");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCategories(parsedData.categories || []);
    }
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spendingCategory: "", // Empty value shows placeholder initially
      dateSpent: getTodayString(),
      totalAmount: 1000,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (editingExpense) {
      reset(editingExpense); // Pre-fill the form with the editing expense data
    }
  }, [editingExpense, reset]);

  function onSubmit(data) {
    // Only proceed if the spendingCategory is valid
    if (data.spendingCategory === "") {
      return;
    }

    if (editingExpense) {
      editExpense({ ...data, id: editingExpense.id });
      updateEditingExpense(undefined); // Reset editing state
    } else {
      addExpense(data);
    }

    // Reset the form, forcing category selection again
    reset({
      id: "-1",
      dateSpent: getTodayString(),
      spendingCategory: "", // Reset value to empty, showing the placeholder
      totalAmount: 1000,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Dropdown for Spending Category */}
        <FormField
          control={form.control}
          name="spendingCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you spend money on?</FormLabel>
              <FormControl>
                <Select {...field} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    {field.value === "" ? "Select a category" : field.value} {/* Placeholder when no value is selected */}
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total Amount Input */}
        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total spending amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="60$"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? parseFloat(value) : 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Input */}
        <FormField
          control={form.control}
          name="dateSpent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of expense</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between items-center">
          <Button type="submit">{editingExpense ? "Update expense" : "Add expense"}</Button>
          <CatButton/>
        </div>
      </form>
    </Form>
  );
}
