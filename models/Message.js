const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  senderEmail  : { type: String, required: true },
  receiverEmail: { type: String, required: true },
  jobId        : { type: Schema.Types.ObjectId, ref: "Job", required: true },
  message      : { type: String },
  file         : { type: String },               // stored filename
  timestamp    : { type: Date,   default: Date.now }
});

module.exports = model("Message", messageSchema);
