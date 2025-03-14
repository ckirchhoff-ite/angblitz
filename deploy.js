import { openProject } from "@stackblitz/sdk";
import fs from "fs";
import path from "path";

// Function to read all files from a directory recursively
function getFiles(dir, fileList = {}) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList); // Recursive call for subdirectories
        } else {
            fileList[filePath.replace(dir + "/", "")] = fs.readFileSync(filePath, "utf8");
        }
    });
    return fileList;
}

// Define the folder containing your Angular source code (e.g., "src/")
const angularSourcePath = "src"; // Change this to your source code folder
const files = getFiles(angularSourcePath);

openProject({
    files,
    title: "Deployed Angular Source Code",
    description: "Editable Angular App on StackBlitz",
    template: "angular-cli"
});
