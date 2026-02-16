import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("RO Backend Running ??");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
