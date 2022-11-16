import express, { Response } from "express";
const router = express.Router();
import { getOwners } from "../controllers/OwnerController";
const OwnerController = require('../controllers/OwnerController');

router.get('/:OwnerId', OwnerController.getOwner);
router.get('/', OwnerController.getOwners);
router.post('/',OwnerController.registerOwner);
module.exports=router