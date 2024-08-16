import RecruiterModel from "../models/recruiter.model.js";

export default class RecruiterController {
  //--- register recruiter ---
  register(req, res, next) {
    RecruiterModel.add(req.body);
    res.redirect("/recruiters/login");
  }

  // --- render the login page
  getLoginView(req, res, next) {
    res.render("login", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMsg: null,
    });
  }

  //--- verify if user is valid or not
  postLogin(req, res, next) {
    const user = RecruiterModel.isValidUser(req.body);
    if (!user) {
      //here we need to render the login page with error
      return res.render("404", {
        errorMsg: "User not found, please verify your crendentials",
      });
    }
    req.session.userEmail = user.email;
    req.session.userName = user.name;
    res.redirect("/jobs");
  }

  //--- logout function ---
  postLogout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/recruiters/login");
      }
    });
  }
}
