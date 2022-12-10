import express from 'express';
import OwnerController from '../controllers/OwnerController';

class OwnerRouter{

    router;

    constructor(ownerController:OwnerController){
        const router = express.Router();
        router.get('/:OwnerId', ownerController.getOwner);
        router.get('/', ownerController.getOwners);
        router.post('/',ownerController.registerOwner);

        this.router=router;
    }
}
export default OwnerRouter;