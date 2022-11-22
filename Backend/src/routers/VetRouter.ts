import express from 'express';
const router = express.Router();
const VetController = require('../controllers/VetController');

router.get('/types',VetController.getVetTypes);
router.get('/:VetId',VetController.getVet);
router.get('/',VetController.getVets);
router.post('/',VetController.registerVet);
router.get('/schedulde/availableHours',VetController.getAvailableHours);
router.get('/:VetId/schedulde',VetController.getVetSchedulde);
router.get('/:VetId/daysOfWeek',VetController.getVetDaysOfWeek);
router.put('/schedulde', VetController.updateSchedulde);

module.exports=router;