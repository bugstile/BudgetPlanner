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
import { getFutureDateString, getTodayString } from "@/utils/helpers";
import useDataStore from "@/hooks/useDataStore";

const formSchema = z
  .object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "startDate must be a valid date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "endDate must be a valid date",
    }),
    target: z.number().positive(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
      return diffInDays >= 30;
    },
    {
      message: "endDate must be at least 30 days after startDate",
      path: ["endDate"],
    }
  );

export default function GoalsForm() {
  const { addGoal } = useDataStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: getTodayString(),
      endDate: getFutureDateString(30),
      target: 1000,
    },
  });

  function onSubmit(data) {
    addGoal(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start at</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter start date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End at</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter end date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter saving goal"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
