export default class JobModel {
  constructor(
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings,
    job_posted,
    applicants,
    posted_by,
    id
  ) {
    this.job_category = job_category;
    this.job_designation = job_designation;
    this.job_location = job_location;
    this.company_name = company_name;
    this.salary = salary;
    this.apply_by = apply_by;
    this.skills_required = skills_required;
    this.number_of_openings = number_of_openings;
    this.job_posted = job_posted;
    this.applicants = applicants;
    this.posted_by = posted_by;
    this.id = id;
  }

  static counter = 8; //used as id of job
  //get jobs
  static get() {
    return jobs;
  }

  //get job by id
  static getById(id) {
    return jobs.find((job) => {
      return job.id == id;
    });
  }

  //add job
  static add(data, email) {
    const newJob = new JobModel(
      data.job_category,
      data.job_designation,
      data.job_location,
      data.company_name,
      data.salary,
      new Date(data.apply_by).toDateString(),
      data.skills_required,
      data.number_of_openings,
      new Date().toDateString(),
      [],
      email
    );

    newJob["id"] = ++this.counter;
    jobs.push(newJob);
  }

  //update job
  static update(data) {
    const index = jobs.findIndex((job) => job.id == data.id);
    const applicants = jobs[index].applicants; //retain the old number of applicants for job
    jobs[index] = new JobModel(
      data.job_category,
      data.job_designation,
      data.job_location,
      data.company_name,
      data.salary,
      new Date(data.apply_by).toDateString(),
      data.skills_required,
      data.number_of_openings,
      new Date().toDateString(),
      applicants,
      data.posted_by,
      data.id
    );
  }

  //delete job
  static delete(id) {
    const index = jobs.findIndex((job) => job.id == id);
    if (index != -1) {
      jobs.splice(index, 1);
    }
  }

  //add applicants
  static addApplicantsId(jobId, applicantId) {
    const index = jobs.findIndex((job) => job.id == jobId);
    jobs[index].applicants.push(applicantId);
  }

  //get job applicants
  static getJobApplicants(jobId) {
    const applicants = jobs.find((job) => job.id == jobId).applicants;
    return applicants;
  }

  //filter by name
  static filterJob(text) {
    text = text.toLowerCase();
    return jobs.filter((job) =>
      job.job_designation.toLowerCase().includes(text)
    );
  }
}

let jobs = [
  new JobModel(
    "Tech",
    "SDE",
    "Noida",
    "Google",
    3500000,
    new Date(2024, 5, 24).toDateString(),
    ["Java", "NodeJs", "React"],
    1,
    new Date().toDateString(),
    [],
    "vbv@gmail.com",
    1
  ),
  new JobModel(
    "Tech",
    "DevOps",
    "Bangalore",
    "Facebook",
    2500000,
    new Date(2024, 8, 24).toDateString(),
    ["Azure", "Docker", "Kubernetes"],
    2,
    new Date().toDateString(),
    [],
    "vbv@gmail.com",
    2
  ),
  new JobModel(
    "Tech",
    "DevOps",
    "Noida",
    "Google",
    2500000,
    new Date(2024, 9, 24).toDateString(),
    ["Azure", "Docker", "Kubernetes", "Java"],
    3,
    new Date().toDateString(),
    [],
    "abc@gmail.com",
    3
  ),
  new JobModel(
    "Tech",
    "MERN Developer",
    "Pune",
    "Amazon",
    2000000,
    new Date(2024, 11, 24).toDateString(),
    ["MongoDB", "NodeJS", "React", "Express"],
    3,
    new Date().toDateString(),
    [],
    "abc@gmail.com",
    4
  ),
  new JobModel(
    "Tech",
    "Full-Stack Developer",
    "Mumbai",
    "Coding Ninja",
    2000000,
    new Date(2024, 12, 24).toDateString(),
    ["MongoDB", "NodeJS", "React", "Express", "Java", "Data Structures & Algo"],
    3,
    new Date().toDateString(),
    [],
    "abc@gmail.com",
    5
  ),
  new JobModel(
    "Tech",
    "Full-Stack Developer",
    "Mumbai",
    "Oracle",
    2000000,
    new Date(2024, 12, 24).toDateString(),
    ["MongoDB", "NodeJS", "React", "Java", "Data Structures & Algo"],
    3,
    new Date().toDateString(),
    [],
    "abc@gmail.com",
    6
  ),
  new JobModel(
    "Tech",
    "SDE",
    "Noida",
    "Google",
    3500000,
    new Date(2024, 10, 24).toDateString(),
    ["Java", "NodeJs", "React", "MongoDB", "Data Structures & Algo"],
    1,
    new Date().toDateString(),
    [],
    "vbv@gmail.com",
    7
  ),
  new JobModel(
    "Tech",
    "Back-End Developer",
    "Noida",
    "Facebook",
    3500000,
    new Date(2024, 11, 24).toDateString(),
    ["Java", "NodeJs", "React", "MongoDB", "Data Structures & Algo"],
    1,
    new Date().toDateString(),
    [],
    "vbv@gmail.com",
    8
  ),
];
