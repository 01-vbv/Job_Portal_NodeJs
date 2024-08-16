import { body, validationResult } from "express-validator";
import RecruiterModel from "../models/recruiter.model.js";

export const validateRequest = async (req, res, next) => {
  const rules = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide valid email address"),
    body("email").custom((value, { req }) => {
      const user = RecruiterModel.doesUserAlreadyExist(req.body.email);
      if (user) {
        throw new Error("User with this email Already Exist");
      }
      return true;
    }),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage(
        "Password should not be empty and atleast 5 characters long"
      ),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("index", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMsg: validationErrors.array()[0],
    });
  }
  next();
};
