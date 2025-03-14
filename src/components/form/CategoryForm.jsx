"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

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
import useEditStore from "@/hooks/useEditStore";
const formSchema = z.object({
  category: z.string().nonempty(),
  color:z.string().nonempty(),
  id:z.string()
})
 
export default function CategoryForm({editingCategory}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          category: "",
          color:"",
          id:"-1",
        },
      })

      const {register,reset}= form;
      const {addCategory,editCategory} = useDataStore();
      const {updateEditingCategory} = useEditStore();
        useEffect(() => {
          if (editingCategory) {
            reset(editingCategory);
          }
        }, [editingCategory, reset]);
      
        function onSubmit(data) {
          if (editingCategory) {
            editCategory({ ...data, id: editingCategory.id })
            updateEditingCategory(undefined);
          } else {
            addCategory(data);
          }
          reset({
              category: "",
              color:"",
              id:"-1",
          });
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
        

        <Button type="submit">{editingCategory ? "Update Category":"Add category"}</Button>
      </form>
    </Form>
    </div>
  )
}
