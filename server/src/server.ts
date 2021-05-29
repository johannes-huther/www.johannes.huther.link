import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 3080;

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

/**
 * A regular Expression that matches git ref's that are tags.
 */
const VERSION_REGEXP = new RegExp("(?<=refs\\/tags\\/).*");

/**
 * Returns the current version, either a release version (e.g. `v0.1.0`) or a short commit SHA.
 */
function getVersion(): string {
  const ref = fs.readFileSync("../data/git_ref.txt").toString();
  let match;
  if ((match = ref.match(VERSION_REGEXP)) !== null) {
    return match[0];
  } else {
    return fs.readFileSync("../data/git_sha.txt").toString().substr(0, 7);
  }
}

/**
 * The current version of this software. Either a release version (e.g. `v0.1.0`) or a short commit SHA.
 */
const version = getVersion();

// Handles queries to the version API endpoint and returns the version.
app.get("/api/version", async (req, res) => {
  res.contentType("application/json");
  res.send({ version: version });
  res.status(200).end();
});

const server = app.listen(port, () => {
  console.log(`Server (revision ${version}) listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server stopped.");
  });
});
