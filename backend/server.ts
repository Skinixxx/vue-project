import express, {Express,Request,Response} from "express";
//its only for settup node express ts 

const port = 8000;
const app = express();

app.get("/",
    (req:Request,res:Response)=>{
        res.send("Hi all p; sdsdg");
    }
)
app.get("/hi",
    (req:Request,res:Response)=>{
        res.send("By");
    }
)
app.listen(port,()=>{
    console.log(`now listening port ${port}`);
}
)