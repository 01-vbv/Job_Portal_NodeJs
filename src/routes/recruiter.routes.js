import express from "express";
import RecruiterController from "../controllers/recruiter.controller.js";
import { validateRequest } from "../middleware/validation.middleware.js";

const router = express.Router();

const recruiterController = new RecruiterController();

router.get("/login", recruiterController.getLoginView);
router.get("/logout", recruiterController.postLogout);

router.post("/register", validateRequest, recruiterController.register);
router.post("/login", recruiterController.postLogin);

export default router;
