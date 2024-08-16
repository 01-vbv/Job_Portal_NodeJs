export default class RecruiterModel {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.job_posted_ids = [];
  }

  static counter = 0;

  static add(data) {
    const newRecruiter = new RecruiterModel(
      data.name,
      data.email,
      data.password
    );

    newRecruiter["id"] = ++this.counter;
    recruiters.push(newRecruiter);
  }

  static isValidUser(data) {
    const result = recruiters.find(
      (recruiter) =>
        recruiter.email == data.email && recruiter.password == data.password
    );

    return result;
  }

  static doesUserAlreadyExist(email) {
    const result = recruiters.find((recruiter) => recruiter.email == email);

    return result;
  }
}
let recruiters = [];
