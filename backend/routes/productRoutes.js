import { Router } from 'express';
import {
  getProductsController,
  getProductByIdController,
  searchProductsController
} from '../controllers/productController.js';

const router = Router();

// GET /api/products
router.get('/', getProductsController);

// GET /api/products/search?q=
router.get('/search', searchProductsController);

// GET /api/products/:id
router.get('/:id', getProductByIdController);

export default router;

