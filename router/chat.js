const express = require("express");
const router  = express.Router();
const Message = require("../models/Message");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");

const upload = multer({ dest: "uploads/chat" });

/* ---- history ----------------------------------------------------------- */
router.get("/", async (req, res) => {
  const { me, with: other, jobId } = req.query;
  const msgs = await Message.find({
    jobId,
    $or: [
      { from: me, to: other },
      { from: other, to: me },
    ],
  }).sort("createdAt");
  res.json(msgs);
});

/* ---- send -------------------------------------------------------------- */
router.post("/", upload.single("file"), async (req, res) => {
  const { from, to, jobId, text } = req.body;
  let filePath = null;

  if (req.file) {
    const finalName = `${req.file.filename}-${req.file.originalname}`;
    fs.renameSync(req.file.path, path.join("uploads/chat", finalName));
    filePath = `uploads/chat/${finalName}`;
  }

  const msg = await Message.create({ jobId, from, to, text, file: filePath });
  req.app.get("io").to(roomId(jobId, from, to)).emit("message", msg); // push out
  res.json(msg);
});

/* ---- helper ------------------------------------------------------------ */
function roomId(jobId, a, b) {
  return `${jobId}-${[a, b].sort().join("#")}`; // stable, order‑independent
}
module.exports = { router, roomId };
