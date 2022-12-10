import express from 'express';
import VetController from '../controllers/VetController';

class VetRouter{

    router;

    constructor(vetController:VetController){
        const router = express.Router();
        router.get('/types',vetController.getVetTypes);
        router.get('/:VetId',vetController.getVet);
        router.get('/',vetController.getVets);
        router.post('/',vetController.registerVet);
        router.get('/schedulde/availableHours',vetController.getAvailableHours);
        router.get('/:VetId/schedulde',vetController.getVetSchedulde);
        router.get('/:VetId/daysOfWeek',vetController.getVetDaysOfWeek);
        router.put('/schedulde', vetController.updateSchedulde);
        router.put('/',vetController.updateVet);
        this.router=router;
    }
}

export default VetRouter;