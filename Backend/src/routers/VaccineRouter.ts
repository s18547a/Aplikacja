import express from 'express';
import VaccineController from '../controllers/VaccineController';


class VaccineRouter{

    router;
    constructor(vaccineController:VaccineController){
        const router = express.Router();


        router.get('/types',vaccineController.getVaccineTypes);
        router.get('/:AnimalId',vaccineController.getAnimalVaccines);
        router.get('/core/:AnimalId',vaccineController.getAnimalCoreVaccineTypes);
        this.router=router;
    }
}

export default VaccineRouter;