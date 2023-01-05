import express from 'express';
import OwnerController from '../controllers/OwnerController';
import { isAuthorizated } from '../middlewares/isAuthorizatied';

class OwnerRouter{

    router;

    constructor(ownerController:OwnerController){
        const router = express.Router();
        router.get('/:OwnerId', isAuthorizated, ownerController.getOwner);
        router.get('/', isAuthorizated, ownerController.getOwners);
        router.post('/',ownerController.registerOwner);

        this.router=router;
    }
}
export default OwnerRouter;