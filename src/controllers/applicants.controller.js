import ApplicantsModel from "../models/applicants.model.js";
import JobModel from "../models/jobs.model.js";

export default class ApplicationController {
  postNewApplicant(req, res, next) {
    const resume = req.file.filename;
    const id = ApplicantsModel.add(req.body, resume);
    //Adds Applicant id to applied jobs applicants array
    JobModel.addApplicantsId(req.params.id, id);
    res.redirect(`/jobs/${req.params.id}`);
  }
}
