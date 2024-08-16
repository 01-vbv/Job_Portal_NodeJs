import ApplicantsModel from "../models/applicants.model.js";
import JobModel from "../models/jobs.model.js";

export default class JobController {
  //--- get all jobs ---
  getJobs(req, res, next) {
    let jobs = JobModel.get();
    res.render("jobs", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  // --- get jobs by id ---
  getJobById(req, res, next) {
    const { id } = req.params;
    const jobFound = JobModel.getById(Number(id));
    if (jobFound) {
      res.render("job_details", {
        job: jobFound,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
        postedBy: jobFound.posted_by,
      });
    } else {
      res.status(401).send("Job Not Found");
    }
  }

  //--- get new job form ---
  getNewJobFormView(req, res, next) {
    res.render("post_new_job_form", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //--- post new job ---
  postNewJob(req, res, next) {
    //check if skills are in array and if is string, store it as array
    if (!Array.isArray(req.body.skills_required)) {
      req.body.skills_required = req.body.skills_required.split();
    }

    JobModel.add(req.body, req.session.userEmail);
    res.redirect("/jobs");
  }

  //--- get update job form ---

  getUpdateJobFormView(req, res, next) {
    const { id } = req.params;
    const job = JobModel.getById(id);
    if (job) {
      res.render("update_job", {
        job: job,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    } else {
      res.render("404", { errorMsg: "Job not found" });
    }
  }

  // --- update job ---
  postUpdateJob(req, res, next) {
    if (!Array.isArray(req.body.skills_required)) {
      req.body.skills_required = req.body.skills_required.split();
    }

    JobModel.update(req.body);
    res.redirect(`/jobs/${req.params.id}`);
  }

  //--- delete job ---
  deleteJob(req, res, next) {
    JobModel.delete(req.params.id);
    res.redirect("/jobs");
  }

  //get job applicants
  getApplicants(req, res, next) {
    const applicantsIds = JobModel.getJobApplicants(req.params.id);
    const applicants = ApplicantsModel.getApplicantsByIds(applicantsIds);
    res.render("applicants", {
      applicants: applicants,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //filter jobs
  postFilteredJobs(req, res, next) {
    const text = req.body.search;
    const jobs = JobModel.filterJob(text);
    res.render("jobs", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
}
