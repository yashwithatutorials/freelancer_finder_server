
const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  freelancerId   : { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  freelancerEmail: String,
  status         : { type: String, default: "pending" },
  applicationDate: { type: Date,   default: Date.now }
});

const JobSchema = new mongoose.Schema(
  {
    employerId    : { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    employerEmail : { type: String, required: true },

    /* what the UI expects */
    jobTitle       : { type: String, required: true },
    jobDescription : { type: String, required: true },
    jobRequirement : [String],
    jobSkills      : [String],
    category       : String,
    location       : String,
    level          : String,

    /* copied from employer when the job is created */
    company      : String,
    companyLogo  : String,
companyName:String,
    applicants: [ApplicantSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);


