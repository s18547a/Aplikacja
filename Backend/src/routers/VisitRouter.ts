import express from 'express';
import VisitController from '../controllers/VisitController';
const router = express.Router();
//const VisitController=require('../controllers/VisitController');
const visitController=new VisitController();
router.get('/activities',visitController.getVisitActivities);
router.get('/search',visitController.searchVisits);
router.get('/:VisitId',visitController.getVisit);

router.get('/', visitController.getVisits);
router.post('/',visitController.registerVisit);

module.exports=router;