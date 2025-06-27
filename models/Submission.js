const { Schema, model } = require("mongoose");

module.exports = model(
  "Submission",
  new Schema(
    {
      jobId     : { type: Schema.Types.ObjectId, ref: "Job", required: true },
      freelancer: { type: String, required: true },    
      client    : { type: String, required: true },    
      files     : [String],
      note      : String
    },
    { timestamps: true }
  )
);
