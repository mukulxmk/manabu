import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from './routes/eventRoutes.js';
import testRouter from './routes/testRouter.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
  }
));

app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running.");
});

app.use("/event-routes", eventRoutes);
app.use("/test-route", testRouter);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  })
  .catch(err => console.log(err));
