import express from 'express';
import fetchUser from '../middlewares/fetchUser.js';
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from '../controllers/Job.controller.js';

const router=express.Router();

router.route("/post").post(fetchUser,postJob);
router.route("/get").get(fetchUser,getAllJobs);
router.route("/getadminjobs").get(fetchUser,getAdminJobs);
router.route("/get/:id").get(fetchUser,getJobById);

router.route("/update/:id").put(fetchUser, updateJob);

export default router;