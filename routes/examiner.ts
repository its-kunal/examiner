import express, { Router } from "express"

const app = Router()

app.use(express.static('public'))
app.get("/", (req, res) => {
    res.render('examiner/sheet')
})

export default app