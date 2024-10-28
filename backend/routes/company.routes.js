import express from 'express';
import { deleteCompany, getCompaniesById, getCompany, registerCompany, updateCompany } from '../controllers/Company.controller.js';
import fetchUser from '../middlewares/fetchUser.js';
import { singleUpload } from '../middlewares/multer.js';
const router=express.Router();

 router.route('/register').post(fetchUser,registerCompany);
 router.route('/companies').get(fetchUser,getCompany);
 router.route('/company/:id').get(fetchUser,getCompaniesById);
 router.route('/company-edit/:id').put(fetchUser,singleUpload,updateCompany);
 router.route('/company-remove/:id').delete(fetchUser,deleteCompany);

 export default router;
