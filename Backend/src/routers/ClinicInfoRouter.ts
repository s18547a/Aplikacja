import express from 'express';
import ClinicInfoController from '../controllers/ClinicInfoController';
const router = express.Router();


const clinicInfoController = new ClinicInfoController();
router.get('/schedulde',clinicInfoController.getClinicSchedulde);

module.exports=router;