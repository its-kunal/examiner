import express, { Request, Response } from "express";
import dotenv from "dotenv";
import verificationRoute from "./routes/verification";
import examinerRoute from "./routes/examiner";
import studentRoute from "./routes/student";
import cors from "cors";
import mongoose from "mongoose";
import os from "os";
import fs from "fs";
import Handlebars from "handlebars";
import hbs from "hbs";
import path from "path";
import puppeteer from "puppeteer";
import authRoute from "./routes/auth";
import examRoute from "./routes/exam";
import multer from "multer";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "hbs");
// app.set("views", "templates");

// Routes
app.use("/auth", authRoute);
app.use("/exam", examRoute);
app.use("/verify", verificationRoute);
app.use("/examiner", examinerRoute);
app.use("/student", studentRoute);

app.get("/test/filehandling", async (req, res) => {
  const data = [
    ["name", "age"],
    ["Abc", "12"],
    ["Abc", "12"],
    ["Abc", "12"],
    ["Abc", "12"],
  ];
  fs.writeFileSync("test.json", JSON.stringify(data));
  let file: any = fs.readFileSync("test.json");
  file = file.toString("base64");
  res.json({ file });
});

app.get("/test/template", async (req, res) => {
  // const template = Handlebars.compile("./templates/hello.hbs");
  const templateString = fs.readFileSync("./templates/hello.hbs", "ascii");
  const css = fs.readFileSync("./templates/report.css", "ascii");
  const template = Handlebars.compile(templateString);
  let content = { content: template({ name: "Xyz", style: css }) };
  // res.send(template({ name: "Kunal" , style: css}));
  // res.sendFile(path.join(__dirname, "./print.pdf"));

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(content.content);
  await page.pdf({
    path: path.join(__dirname, "./print.pdf"),
    format: "A4",
  });
  res.sendFile(path.join(__dirname, "./print.pdf"));
  await browser.close();
});

// Server Requests
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Examiner, Server is running");
});

// export const storagePath = path.join(__dirname, "/temp");
// export const  indexPath = __dirname;

// Start Server
mongoose
  .connect(process.env.MONGODB_URI || "")

  .then(() => {
    let serverName = String(
      // @ts-ignore
      os.networkInterfaces()["Wi-Fi"][1]["address"] || "localhost",
    );
    app.listen(Number(process.env.PORT), serverName, () => {
      console.log(
        "Server Started",
        `at http://${serverName}:${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to Database");
  });

// export const upload =  multer({ dest: storagePath });
