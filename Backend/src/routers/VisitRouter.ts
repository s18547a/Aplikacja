import express, { Response } from "express";
const router = express.Router();
const VisitController=require('../controllers/VisitController');

router.get('/activities',VisitController.getVisitActivities);
router.get('/:VisitId',VisitController.getVisit);
router.get("/", VisitController.getVisits);
router.post("/",VisitController.registerVisit);

module.exports=router;