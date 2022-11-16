import express, { Response } from "express";
const router = express.Router();
const clinicInfoController=require('../controllers/ClinicInfoController');

router.get('/schedulde',clinicInfoController.getClinicSchedulde)

module.exports=router