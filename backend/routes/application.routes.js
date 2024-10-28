import express from 'express';
import { applyJobs, getappliedApplicant, getAppliedJobs, updateStatus } from '../controllers/Application.controller.js';
import fetchUser from '../middlewares/fetchUser.js';
const router=express.Router();

router.route("/apply/:id").get(fetchUser,applyJobs);
router.route("/get").get(fetchUser,getAppliedJobs)
router.route("/:id/applicants").get(fetchUser,getappliedApplicant);
router.route("/status/:id/update").post(fetchUser,updateStatus);

export default router;