import express from "express";
import path from "path";

const app = express();
const port = 3080;

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
