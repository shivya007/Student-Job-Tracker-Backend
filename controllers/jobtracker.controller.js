const asyncHandler = require('express-async-handler');
const AppError = require("../utils/AppError.js");
const Jobtracker = require('../models/job.model.js');


const createJob = asyncHandler(async(req, res, next) =>{
    try {
        const {company, role, status, dateofApplication, link} = req.body;

        if(!company || !role || !status || !dateofApplication || !link){
            return next(new AppError("All Fields are required", 400));
        }

        const allowedStatus = ["Applied", "Interview", "Offer", "Rejected"];

        if(!allowedStatus.includes(status)){
            return next(new AppError("Invalid status value", 400));
        }

        // ✅ Validate date format
        const parsedDate = new Date(dateofApplication);
        if (isNaN(parsedDate.getTime())) {
            return next(new AppError("Invalid date format for dateofApplication", 400));
        }

        const newjobtrack = await Jobtracker.create({
            company,
            role,
            status,
            dateofApplication,
            link,
        });

        await newjobtrack.save();

        res.status(201).json({
            status: true,
            data: newjobtrack,
        });

    } catch (error) {
        return next (new AppError(`Error occuring while creating job ${error}`, 500));
    }
});


const getAllJobs = asyncHandler(async(req, res, next) =>{

    try {
        const getJobList = await Jobtracker.find();
    
        if(!getJobList){
            return next(new AppError("No Job Listing found", 404));
        }
        res.status(200).json({
            success: true,
            getJobList,
        });
    } catch (error) {
        return next(new AppError(`Error coming from get Job Listings ${error}`, 500));
    }





});


const updateJobStatus = asyncHandler(async(req, res, next) =>{
    try {

        const {id} = req.params;

        const existingJob = await Jobtracker.findById(id);

        if(!existingJob){
            return next (new AppError("blog not found", 404));
        }

        const {status} = req.body;

        const allowedStatus = ["Applied", "Interview", "Offer", "Rejected"];
        if (!allowedStatus.includes(status)) {
            return next(new AppError("Invalid status", 400));
        }

        existingJob.status = status || existingJob.status;
        
        await existingJob.save();

        res.status(200).json({
            success: true,
            existingJob,
        })
        

    } catch (error) {
        return next(new AppError(`Error coming from updating Job Status ${error}`, 500));
    }
});


const deleteJobEntry = asyncHandler(async(req, res, next) =>{

    const {id} = req.params;

    const job = await Jobtracker.findById(id);
    if(!job){
        return next(new AppError("Job not found", 404));
    }

    await job.deleteOne();

    res.status(200).json({
        status: "success",
        message: "Job deleted successfully",
    })
});


module.exports = {createJob, getAllJobs, updateJobStatus, deleteJobEntry};