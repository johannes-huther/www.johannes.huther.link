import express from "express";
import path from "path";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand(dotenv.config({ path: "../.env" }));
dotenvExpand(dotenv.config({ path: "../.env.local" }));

import { getVersion } from "../../common/version";

const app = express();
const port = 3080;

app.use(express.static(path.join(__dirname, "../../../../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../../dist/index.html"));
});

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
