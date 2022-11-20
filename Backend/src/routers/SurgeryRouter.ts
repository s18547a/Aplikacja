import express, { Response } from "express";
const router = express.Router();
const SurgeryController=require('../controllers/SurgeryController');
router.get("/types",SurgeryController.getSurgeryTypes);
router.get("/:SurgeryId", SurgeryController.getSurgery);
router.get("/", SurgeryController.getSurgeries);


router.post('/',SurgeryController.registerSurgery);
router.put('/:SurgeryId/report',SurgeryController.updateSurgeryReport)
router.delete('/:SurgeryId',SurgeryController.deleteSurgery)

module.exports=router