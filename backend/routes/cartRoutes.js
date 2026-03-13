import { Router } from 'express';
import {
  getCartController,
  addCartController,
  updateCartController,
  deleteCartController
} from '../controllers/cartController.js';

const router = Router();

// GET /api/cart
router.get('/', getCartController);

// POST /api/cart
router.post('/', addCartController);

// PUT /api/cart/:id
router.put('/:id', updateCartController);

// DELETE /api/cart/:id
router.delete('/:id', deleteCartController);

export default router;

