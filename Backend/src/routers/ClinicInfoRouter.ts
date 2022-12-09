import express from 'express';
import ClinicInfoController from '../controllers/ClinicInfoController';
import ClinicInfoRepository from '../models/repositories/ClinicInfoRepository';
const router = express.Router();
const clinicInfoRepository=new ClinicInfoRepository();

const clinicInfoController = new ClinicInfoController(clinicInfoRepository);
router.get('/schedulde',clinicInfoController.getClinicSchedulde);

module.exports=router;