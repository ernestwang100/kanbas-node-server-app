import "dotenv/config";
import session from "express-session";
import express from 'express';
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import cors from 'cors';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/users/routes.js";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
if (process.env.NODE_ENV !== "development") {
sessionOptions.proxy = true;
sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
};
}
app.use(session(sessionOptions));
      
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000)