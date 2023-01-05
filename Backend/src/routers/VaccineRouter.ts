import express from 'express';
import VaccineController from '../controllers/VaccineController';
import { isAuthorizated } from '../middlewares/isAuthorizatied';


class VaccineRouter{

    router;
    constructor(vaccineController:VaccineController){
        const router = express.Router();


        router.get('/types', isAuthorizated,vaccineController.getVaccineTypes);
        router.get('/:AnimalId', isAuthorizated,vaccineController.getAnimalVaccines);
        router.get('/core/:AnimalId', isAuthorizated,vaccineController.getAnimalCoreVaccineTypes);
        this.router=router;
    }
}

export default VaccineRouter;