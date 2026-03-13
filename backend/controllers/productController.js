import {
  getProducts,
  getProductById,
  searchProductsByName
} from '../models/productModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProductsController = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const categoryId = req.query.category
    ? Number(req.query.category)
    : undefined;

  const data = await getProducts({ page, limit, categoryId });
  res.json({
    products: data.items,
    pagination: {
      page: data.page,
      limit: data.limit,
      total: data.total,
      totalPages: data.totalPages
    }
  });
});

export const getProductByIdController = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const product = await getProductById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ product });
});

export const searchProductsController = asyncHandler(async (req, res) => {
  const q = req.query.q || '';
  if (!q.trim()) {
    return res.json({ products: [], pagination: { page: 1, limit: 0, total: 0, totalPages: 0 } });
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;

  const data = await searchProductsByName(q, { page, limit });
  res.json({
    products: data.items,
    pagination: {
      page: data.page,
      limit: data.limit,
      total: data.total,
      totalPages: data.totalPages
    }
  });
});

