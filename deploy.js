const fs = require("fs");

// Define output folder for GitHub Pages (or another host)
const outputPath = "deploy";
fs.mkdirSync(outputPath, { recursive: true });

// Copy index.html to the deployment folder
fs.copyFileSync("index.html", `${outputPath}/index.html`);

console.log("Deployment files prepared. Now push them to GitHub Pages or another host.");

