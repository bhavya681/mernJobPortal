import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import user from "./routes/user.routes.js";
import company from "./routes/company.routes.js";
import application from "./routes/application.routes.js";
import job from "./routes/job.routes.js";
import path from "path";

const app = express();

connectDB();

dotenv.config({});

const _dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://mernjobportal-2-1cwi.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

//api's
app.use("/api/v1/user", user);
app.use("/api/v1/company", company);
app.use("/api/v1/job", job);
app.use("/api/v1/application", application);



const port = process.env.PORT || 4000;

app.use(express.static(path.join(_dirname, "/frontend/vite-project/dist")));

app.get("*",(req,res)=>{
  return res.sendFile(path.resolve(_dirname,"frontend/vite-project","dist","index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
