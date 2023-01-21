import express, { Router } from "express"

const app = Router()

app.get("/", (req, res) => {
    res.render('examiner/sheet')
})

export default app