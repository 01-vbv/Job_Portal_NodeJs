//---------  Imports --------
import express from "express";
import JobController from "../controllers/job.controller.js";
import { auth } from "../middleware/auth-middleware.js";

// ---------- Routes ( default route /jobs )----------
const router = express.Router();

const jobController = new JobController();

router.get("/postjob", auth, jobController.getNewJobFormView);
router.get("/update/:id", auth, jobController.getUpdateJobFormView);
router.get("/delete/:id", auth, jobController.deleteJob);
router.get("/:id/applicants", auth, jobController.getApplicants);
router.get("/:id", jobController.getJobById);
router.get("/", jobController.getJobs);

router.post("/", auth, jobController.postNewJob);
router.post("/update/:id", auth, jobController.postUpdateJob);
router.post("/search", jobController.postFilteredJobs);

export default router;
