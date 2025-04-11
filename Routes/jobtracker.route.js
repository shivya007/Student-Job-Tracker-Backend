const express = require('express');
const { createJob, getAllJobs, updateJobStatus, deleteJobEntry } = require('../controllers/jobtracker.controller.js');
const router = express.Router();


router.post("/create", createJob);
router.get("/getJobs", getAllJobs);
router.put("/:id/update", updateJobStatus);
router.delete("/:id", deleteJobEntry);

module.exports = router;