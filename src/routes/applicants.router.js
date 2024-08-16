// -----------  Imports ---------
import express from "express";
import ApplicationController from "../controllers/applicants.controller.js";

// ---------- Routes ( default route /applicants )----------
const router = express.Router();

const applicantsController = new ApplicationController();

router.post("/:id", applicantsController.postNewApplicant);

export default router;
