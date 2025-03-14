"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getFutureDateString, getTodayString } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDataStore from "@/hooks/useDataStore";
import { useEffect } from "react";

const formSchema = z.object({
  spendingCategory: z.string().min(2, {
    message: "Spending category must be at least 2 characters.",
  }),
  dateSpent: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date of expense must be a valid date",
  }),
  totalAmount: z.number().positive(),
});

export default function Spendings() {
  const { addExpense } = useDataStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        spendingCategory: 'Games',
        dateSpent: getTodayString(),
        totalAmount: 1000,
    },
  });

  function onSubmit(data) {
    addExpense(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="spendingCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you spend money on?</FormLabel>
              <FormControl>
                <Input placeholder="Games" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Total spending amount</FormLabel>
            <FormControl>
                <Input type="number"
                placeholder="60$" {...field} 
                onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? parseFloat(value) : 0);
                  }
                }/>
            </FormControl>
            <FormMessage />
            </FormItem>
            )}
        />

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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
