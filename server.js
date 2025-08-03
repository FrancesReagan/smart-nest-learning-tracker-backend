
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import coursesRouter from "./routes/courses.js";
import usersRouter from "./routes/users.js";
import sessionsRouter from "./routes/sessions.js";
import db from "./config/connection.js";



// load env variables from .env//
dotenv.config();

// create an express app//
const app = express();
const PORT = process.env.PORT || 3000;

// add morgan logging --//
if(process.env.NODE_ENV === "production") {
  // give logs from production//
  app.use(morgan("combined"));
} else {
  // logs for development//
  app.use(morgan("dev"));
}


// middleware---//
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    // This is the variable that must be set on your Render backend service
    process.env.FRONTEND_URL
].filter(Boolean); // Filters out any undefined or empty strings

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        // Check if the origin is in our explicitly allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // ADDITION: Check if the origin is a Netlify deploy preview URL.
        const netlifyPattern = /^https:\/\/deploy-preview-\d+--smartnesttracker\.netlify\.app$/;
        if (netlifyPattern.test(origin)) {
            return callback(null, true);
        }
        
        // If the origin is not in the allowed list or a Netlify preview, deny access.
        const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


// used to parse JSON and URL encoded data//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// route handlers--mounting//
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
// may change this to /api/sessions//
app.use("/api", sessionsRouter);



// // event based--on mount --on open --database collection handler-//
db.once("open", () => {
  console.log("Connected to MongoDB");
app.listen(PORT, ()=> {
  console.log(`Server is listening on localhost:${PORT}`);
});
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
  process.exit(1);
})

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});




// // promise based mongoDB connection approach---not using config folder/connection.js file--no db//
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`Server is running on localhost:${PORT}`);
//   });
// })

