import { describe, expect, test } from "@jest/globals";
import FormData from "form-data";
import fs from "fs";
import mongoose from "mongoose";
import axios from "axios";
import request from "superagent";
import { app } from "../main";
import { readFile } from "fs/promises";
import { createReadStream } from "fs";

const testMongoURI = "mongodb://127.0.0.1:27017/jest-tests";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

describe("exam api test", () => {
  let server;
  beforeAll(async () => {
    // await mongoose.connect(testMongoURI);
    app.listen("4000", () => {
      console.log("server started");
      console.log(mongoose.connection.on("connected", () => {
        console.log("connected");
      }));
    });
    // app.length
  });
  // afterAll(async () => {
  //   await mongoose.disconnect();
  //   server.closeAllConnections();
  // });
  it("POST Exam", async () => {
    const fileContent = Buffer.from("test content");
    const file = new Blob([fileContent], { type: "text/plain" });

    const data = new FormData();
    data.append(
      "instituteLogo",
      fs.createReadStream(
        "C:/Users/Kunal/OneDrive/Pictures/Raipur Dev Dungeon LogoArtboard 2 copy-100.jpg"
      )
    );
    let obj = {
      name: "Abc",
      username: "Abcv123",
      startedAt: new Date().getTime(),
      endsAt: new Date().getTime(),
      instructions: ["abc"],
      instituteName: "xyz",
    };
    Object.entries(obj).forEach(([key, value]) => {
      data.append(key, JSON.stringify(value));
    });
    let res;
    try {
      res = await axiosInstance.post("/exam", data, {
        headers: { ...data.getHeaders() },
      });
    } catch (error) {
      console.log(error.response.data);
    }

    // console.log(res.data);

    return expect(res.status).toBe(200);
  });

  it("GET Exam test", async () => {
    const res = await axiosInstance.get("/exam");
    return expect(res.status).toBe(200);
  });
});
