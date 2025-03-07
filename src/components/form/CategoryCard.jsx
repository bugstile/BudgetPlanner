import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function CategoryCard({category,color}){
    return( 
    <div className="min-w-24 max-w-32 h-min border-black border-2 rounded-lg flex flex-col items-center">
        <Card className="w-full flex flex-col p-1">
            <div className="h-2 rounded-xl mx-1 mt-1" style={{backgroundColor:color}}>
            </div>
            <CardContent className="mt-1 p-0 pb-1">
                <CardTitle className="text-slate-800">{category}</CardTitle>
            </CardContent>
            <CardFooter className="p-0">
                <button className="bg-red-500 px-2 text-xs py-0 my-0 rounded-md">delete</button>
            </CardFooter>

    </Card>
    </div>
    
    )
}