"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const formSchema = z.object({
  category: z.string(),
  color:z.string(),
})
 
export default function CategoryForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          category: "",
          color:""
        },
      })

      const {register}= form;

      function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        console.log(values)
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormDescription>
                This is your expense category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input type="color" {...register("color")}/>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
