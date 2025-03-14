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
import useDataStore from "@/hooks/useDataStore";
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
      const {addCategory} = useDataStore();

      function onSubmit(values) {
        addCategory(values);
        
        console.log(values)
      }
  return (
    <div className="w-1/2 border-2 m-5 p-3 rounded-sm border-slate-900"> 


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
                Write the name of your category. This will be used to split up your spending.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-col">
          <FormLabel className="m-0">Click the square below and choose a color to match your category</FormLabel>
          <input className="h-8 m-0 py-0" type="color" {...register("color")}/>
          <FormDescription>
            Click the box to start selecting your color.
          </FormDescription>
        </FormItem>
        

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
