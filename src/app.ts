import express, { Application, Request, Response,} from "express";
import cors from 'cors';
import { notFound } from "./app/middleware/notFound";

const app:Application= express();


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true,
}));


app.get('/', (req:Request, res:Response)=>{
    const result= "Hello world";
    res.send(result)
});



// not found middleware
app.use(notFound);


export default app;


