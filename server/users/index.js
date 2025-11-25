import express from "express";
import { addContent, readContent, updateContent } from "../utils/helper.js";

const dbPath = "/home/rupjitdhali/expressToDo/server/data.json";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "server is working" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/adduser", async (req, res) => {
  let newUser;
  try {
    const { fullName, age, isAlive } = req.body;

    if (!fullName || !age) {
      return res.status(400).json({
        success: false,
        msg: "Please provide fullName and age",
      });
    }

    let allUsers = await readContent();

    newUser = {
      fullName,
      age: parseInt(age),
      isAlive: isAlive !== undefined ? isAlive : true,
    };

    allUsers.push(newUser);
    await updateContent(dbPath, allUsers);

    res.status(201).json({
      success: true,
      msg: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error creating user",
      data: newUser,
    });
  }
});

router.put("/updateuser/:id", async (req, res) => {
  try {
    let existData = await readContent();
    let id = req.params.id;
    if (id <= 0 || id > existData.length) {
      return res.status(401).json({ msg: "Invalid id" });
    }
    existData[id - 1].fullName =
      req.body.fullName || existData[id - 1].fullName;
    existData[id - 1].age = req.body.age || existData[id - 1].age;
    await updateContent(dbPath, existData);
    res.status(200).json({ msg: "Account updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error updating user",
      error: error.message,
    });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const users = await readContent();
    const id = parseInt(req.params.id);

    if (id <= 0 || id > users.length) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const user = users[id - 1];
    const updatedList = users.filter((u, index) => index !== id - 1);
    await updateContent(dbPath, updatedList);

    res.json({ success: true, msg: "User deleted", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Server error", error: error.message });
  }
});
export default router;
