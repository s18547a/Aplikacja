import express from 'express';
import OwnerController from '../controllers/OwnerController';
const router = express.Router();
//const OwnerController = require('../controllers/OwnerController');
const ownerController=new OwnerController();
router.get('/:OwnerId', ownerController.getOwner);
router.get('/', ownerController.getOwners);
router.post('/',ownerController.registerOwner);
module.exports=router;