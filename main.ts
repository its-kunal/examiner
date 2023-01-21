import express from "express"
import dotenv from "dotenv"
import "ejs"
import path from "path"
import examinerRoute from "./routes/examiner"
dotenv.config()
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use("/examiner",examinerRoute)

app.get("/", (req: express.Request, res: express.Response) => {
    res.render('index')
})



const hostname = "127.0.0.1"

app.listen(Number(process.env.PORT), hostname, () => {
    console.log("Server Started")
})

