import express from 'express';
import VisitController from '../controllers/VisitController';

class VisitRouter{

    router;
    constructor(visitController:VisitController){
        const router = express.Router();
        router.get('/activities',visitController.getVisitActivities);
        router.get('/search',visitController.searchVisits);
        router.get('/:VisitId',visitController.getVisit);

        router.get('/', visitController.getVisits);
        router.post('/',visitController.registerVisit);
        this.router=router;
    }
}

export default VisitRouter;