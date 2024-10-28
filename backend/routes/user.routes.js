import express from 'express';
import { forgotPassword, login, logout, profile, register, updatePicProfile, updateProfile } from '../controllers/User.controller.js';
import fetchUser from '../middlewares/fetchUser.js';
import { singleUpload } from '../middlewares/multer.js';

const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(fetchUser,singleUpload,updateProfile);
router.route("/profile/pic/update").post(fetchUser,singleUpload,updatePicProfile);
router.route("/profile").get(fetchUser,profile);

router.route("/forgot-password").post(forgotPassword);

export default router;