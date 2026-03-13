import { Router } from 'express';
import {
  placeOrderController,
  getOrderByIdController
} from '../controllers/orderController.js';

const router = Router();

// POST /api/orders
router.post('/', placeOrderController);

// GET /api/orders/:id
router.get('/:id', getOrderByIdController);

export default router;

