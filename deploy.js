const fs = require("fs");
const path = require("path");
const axios = require("axios"); // Install axios if not already installed

// Function to collect all source files
function getFiles(dir, fileList = {}) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else {
            fileList[filePath.replace(dir + "/", "")] = fs.readFileSync(filePath, "utf8");
        }
    });
    return fileList;
}

// Define the source folder for your Angular project
const angularSourcePath = "src";
const files = getFiles(angularSourcePath);

// Prepare the payload for StackBlitz API
const payload = {
    files,
    title: "Deployed Angular Source Code",
    description: "Editable Angular App on StackBlitz",
    template: "angular-cli"
};

// Upload to StackBlitz
axios.post("https://stackblitz.com/api/projects", payload)
    .then(response => {
        console.log("StackBlitz Project Created:", response.data.url);
    })
    .catch(error => {
        console.error("Error creating StackBlitz project:", error.response ? error.response.data : error.message);
    });

