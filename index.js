import express from "express";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
const port = 8001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/", router);
