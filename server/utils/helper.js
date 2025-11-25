import fs from "fs/promises";

const dbPath = "/home/rupjitdhali/expressToDo/server/data.json";

async function readContent() {
  let allData = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(allData);
}

async function addContent(file, content) {
  await fs.writeFile(file, content);
  console.log("File Created");
}

async function updateContent(file, content) {
  await fs.writeFile(file, JSON.stringify(content, null, 4))
  console.log("Content Deleted");
}

async function deleteContent(file, content) {
  await fs.writeFile(file, JSON.stringify(content, null, 4))
  console.log("Content Deleted");
}
export { readContent, addContent, updateContent, deleteContent }
