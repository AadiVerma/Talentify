import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import Routes from "./Routes/Routes.js";
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/v1",Routes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});