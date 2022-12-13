import express from 'express';
import SurgeryController from '../controllers/SurgeryController';


class SurgeryRouter{

    router;
    constructor(surgeryController:SurgeryController){
        const router = express.Router();
        router.get('/types',surgeryController.getSurgeryTypes);
        router.get('/search',surgeryController.searchSurgeries);
        router.get('/:SurgeryId', surgeryController.getSurgery);
      
        router.get('/', surgeryController.getSurgeries);
        router.post('/',surgeryController.registerSurgery);
        router.put('/:SurgeryId/report',surgeryController.updateSurgeryReport);
        router.delete('/:SurgeryId',surgeryController.deleteSurgery);

        this.router=router;
    }
}
export default SurgeryRouter;