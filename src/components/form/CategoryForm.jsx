"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef } from "react";
import { FaPalette } from "react-icons/fa";
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
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";
import { Input } from "@/components/ui/input";

// Tailwind chart colors mapping expanded to 15 without labels
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
  "hsl(var(--chart-11))",
  "hsl(var(--chart-12))",
  "hsl(var(--chart-13))",
  "hsl(var(--chart-14))",
  "hsl(var(--chart-15))",
];

const formSchema = z.object({
  category: z.string().nonempty(),
  color: z.string().nonempty(),
  id: z.string(),
});

export default function CategoryForm({ editingCategory }) {
  // Create a ref for the input field
  const inputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      color: chartColors[0], // Default color (chart-1)
      id: "-1",
    },
  });

  const { register, reset, setValue, watch } = form;
  const { addCategory, editCategory } = useDataStore();
  const { updateEditingCategory } = useEditStore();

  // Watch the color value in real-time
  const selectedColor = watch("color");

  useEffect(() => {
    if (editingCategory) {
      // Delay focus to ensure the DOM is updated
      setTimeout(() => {
        const categoryInput = document.getElementById('categoryField');
        if (categoryInput) {
          categoryInput.focus();
          categoryInput.select(); // Select the text inside
        }
      }, 175);
      reset(editingCategory);
    }
  }, [editingCategory, reset]);

  function onSubmit(data) {
    if (editingCategory) {
      editCategory({ ...data, id: editingCategory.id });
      updateEditingCategory(undefined);
    } else {
      addCategory(data);
    }
    reset({
      category: "",
      color: chartColors[0], // Reset to default color
      id: "-1",
    });
  }

  return (
    <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 items-center">
      <div className="w-full bg-lighterBackground p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      id="categoryField"
                      {...register("category")} // Register the input field with the form
                      ref={(e) => {
                        register("category").ref(e); // Combine register ref with inputRef
                        inputRef.current = e; // Assign ref to inputRef for focus handling
                      }}
                      placeholder="Groceries"
                    />
                  </FormControl>
                  <FormDescription>
                    Write the name of your category. This will be used to split up your spending.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="flex flex-col">
              <FormLabel className="m-0">Select a color:</FormLabel>
              <div className="flex items-center">
                <input
                  type="color"
                  {...register("color")}
                  className="w-0" // Hides the input
                  onChange={(e) => {
                    setValue("color", e.target.value); // Update color on change
                  }}
                />
                <button
                  type="button"
                  className="p-2 border-2 border-border hover:bg-primary focus:bg-primary rounded-full"
                  onClick={() => document.querySelector('input[type="color"]').click()} // Trigger color input
                  title="Pick a color"
                >
                  <FaPalette className="text-2xl color-primary" />
                </button>
                {/* Color Display Box */}
                <div
                  className="ml-2 w-10 h-10 border rounded-full"
                  style={{ backgroundColor: selectedColor }} // Display selected color
                />
              </div>
              <FormDescription>Click the palette icon to select a color.</FormDescription>
            </FormItem>

            <FormItem>
              <FormLabel className="m-0">Or choose from the predefined colors:</FormLabel>
              <div className="flex flex-wrap gap-2">
                {chartColors.map((color, index) => (
                  <Button
                    key={index} // Using index as key since there are no labels
                    type="button"
                    className="w-10 h-10 rounded-full focus:border-ring-2 focus:border-2 hover:border-ring-2 hover:border hover:outline-0 hover:outline"
                    style={{ backgroundColor: color }}
                    onClick={() => setValue("color", color)} // Update color when clicked
                  />
                ))}
              </div>
            </FormItem>
            <Button type="submit">{editingCategory ? "Update Category" : "Add Category"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
