// -------- core modules ----------------
import path from "path";
// -------- third party modules -------------
import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
//--------- user modules ------------
import jobs_router from "./src/routes/jobs.router.js";
import applicants_router from "./src/routes/applicants.router.js";
import recruiters_router from "./src/routes/recruiter.routes.js";
import { uploadFile } from "./src/middleware/file-upload-middleware.js";

const app = express();
//--------- serving static files directory ------
app.use(express.static("public"));

//--- setup session ------
app.use(
  session({
    secret: "pu5uZSM0ssWAfndgdK1ms65kXDNQIkEBmR",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//--------- setup view engine -------------------
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

//--------- middleware -----------------
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// -------- routes ------
app.use("/jobs", jobs_router);
app.use("/applicants", uploadFile.single("resume"), applicants_router);
app.use("/recruiters", recruiters_router);

// ---- Landing page route----------
app.get("/", (req, res, next) => {
  res.render("index", {
    userEmail: req.session.userEmail,
    userName: req.session.userName,
    errorMsg: null,
  });
});

export default app;
