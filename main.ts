import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.get("/", (req: any, res: any) => {
    res.send("hello")
})
const hostname = "192.168.1.1"

app.listen(Number(process.env.PORT), hostname, () => {
    console.log("Server Started")
})  

