import { Router } from "express";
import { validateClientId } from "../middleware/validationClients";
import * as clientController from '../controllers/controllerClient';

const router = Router();

router.param('id',validateClientId);

router.post('/:id/status',clientController.updateClientStatus);
router.get('/statuses/available',clientController.getAvailableStatuses);

router.get('/',clientController.getAllClients);
router.get('/:id',clientController.getClientById);


export default router;