export const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.render("404", {
      errorMsg:
        "only recruiter is allowed to access this page, login as recruiter to continue",
    });
  }
};
