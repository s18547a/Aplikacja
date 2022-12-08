import express from 'express';
import SurgeryController from '../controllers/SurgeryController';
const router = express.Router();
//const SurgeryController=require('../controllers/SurgeryController');
const surgeryController= new SurgeryController();
router.get('/types',surgeryController.getSurgeryTypes);
router.get('/:SurgeryId', surgeryController.getSurgery);
router.get('/', surgeryController.getSurgeries);


router.post('/',surgeryController.registerSurgery);
router.put('/:SurgeryId/report',surgeryController.updateSurgeryReport);
router.delete('/:SurgeryId',surgeryController.deleteSurgery);

module.exports=router;