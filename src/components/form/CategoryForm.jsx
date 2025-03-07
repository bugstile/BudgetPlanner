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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4" >
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
                Write the name of your category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-col">
          <FormLabel className="m-0">Pick a color from the wheel below to match your category</FormLabel>
          <input className="h-8 m-0 py-0" type="color" {...register("color")}/>
          <FormDescription>
            Click the box to start selecting your color.
          </FormDescription>
        </FormItem>
        

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
