export default class ApplicantsModel {
  constructor(name, email, contact, resume_path, id) {
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resume_path = resume_path;
    this.id = id;
  }

  static counter = 0;

  static add(data, resume) {
    const newApplicant = new ApplicantsModel(
      data.name,
      data.email,
      data.contact,
      resume
    );

    newApplicant["id"] = ++this.counter;
    applicants.push(newApplicant);
    return newApplicant.id;
  }

  static get(id) {
    return applicants.find((applicant) => applicant.id == id);
  }

  static getApplicantsByIds(applicantIds) {
    return applicantIds.map((id) => this.get(id));
  }
}

let applicants = [];
