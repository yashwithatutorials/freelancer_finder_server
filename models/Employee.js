const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const applicationSchema = new Schema({
  jobId           : { type: Schema.Types.ObjectId, ref: 'Job', required: true },   // ✅ ref Job
  applicationDate : { type: Date, default: Date.now },
  status          : { type: String, enum: ['pending', 'reviewed', 'rejected', 'hired'], default: 'pending' }
}, { _id:false });

const employeeSchema = new Schema({
  /*  basic profile  */
  name         : { type: String,  required: true },
  email        : { type: String,  required: true, unique: true },
  password     : { type: String,  required: true },
  role         : { type: String,  enum: ['client', 'freelancer'], required: true },

  /*  optional profile fields  */
  profileImage : String,
  phoneNumber  : String,
  location     : String,
  position     : String,
  description  : String,
  resume       : String,
  experience   : String,
  projects     : String,
  rating       : String,
  skills       : [String],
  companyLogo  : String,
   companyName:String,
  /*  job‑related arrays  */
  jobApplications : [applicationSchema],               // applications *sent* by this user
  createdAt       : { type: Date, default: Date.now }
});

module.exports = model('Employee', employeeSchema);
