import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// app.use(cors());

// load env variables from .env//
dotenv.config();

// create an express app//
const app = express();
const PORT = process.env.PORT || 3000;

// middleware---used to parse JSON and URL encoded data//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route handlers--mounting//


app.listen(PORT,()=> console.log(`Server is listening on localhost:${PORT}`));