import express from "express";
import dotenv from "dotenv";
import fs from "fs/promises";
import userRouter from "./users/index.js";
dotenv.config();


const dbPath = "./data.json"

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    //Sending Data to Users
    res.status(200).json({ msg: "server is working" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/users", userRouter);



app.get("/readcontent", async (req, res) => {
   try {
    const readcontent = await readContent();
    res.status(200).json({ readcontent });
   } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
   } 
});




app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});