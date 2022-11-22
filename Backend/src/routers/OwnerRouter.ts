import express from 'express';
const router = express.Router();
const OwnerController = require('../controllers/OwnerController');
router.get('/:OwnerId', OwnerController.getOwner);
router.get('/', OwnerController.getOwners);
router.post('/',OwnerController.registerOwner);
module.exports=router;