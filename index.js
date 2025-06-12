import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import bayargitar from "./routes/bayargitar.js";
import "./models/assosiasi.js";
import gitarroute from "./routes/gitarroute.js";

dotenv.config();

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(cors({
  credentials: true,
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(gitarroute);
app.use(bayargitar);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});