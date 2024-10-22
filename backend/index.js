import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./src/routes/auth.route.js";
import recipeRoutes from "./src/routes/recipe.route.js";
import userRoutes from "./src/routes/user.route.js";

import connectDB from "./src/config/db.config.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:'https://recipemix.vercel.app',
    credentials:true
}));

connectDB();

app.use("/api/auth" , authRoutes);
app.use("/api/recipe" , recipeRoutes);
app.use("/api/user" , userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})