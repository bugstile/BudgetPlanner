import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function CategoryCard({category,color}){
    return( 
    <div>
        <Card style={{backgroundColor:color}}>
            <CardHeader >
                <CardTitle>{category}</CardTitle>
                <CardDescription>This is your expenses</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content</p>
            </CardContent>
            <CardFooter>
                
                <button>delete</button>
            </CardFooter>

    </Card>
    </div>
    
    )
}