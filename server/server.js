import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import passport from 'passport';
import './config/passport.js';
import cookieParser from "cookie-parser";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

const allowedOrigins=['http://localhost:5173',"https://api.cloudinary.com"]

// Middleware
app.use(cookieParser())
app.use(cors({ origin:allowedOrigins,credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// google
app.use(passport.initialize());


connectDB();

// Routes 
app.use("/api/auth", (await import("./routes/auth.js")).default)
app.use("/api/client", (await import("./routes/client.js")).default)


// Server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));