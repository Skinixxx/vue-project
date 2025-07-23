import { Router } from "express";
import { validateClientId } from "../middleware/validationClients";
import * as clientController from '../controllers/controllerClient';

const router = Router();

router.param('id',validateClientId);

router.get('/',clientController.getAllClients);
router.get('/:id',clientController.getClientById);
router.get('/:id/status',clientController.updateClientStatus);
router.get('/statuses/available',clientController.getAvailableStatuses);

export default router;