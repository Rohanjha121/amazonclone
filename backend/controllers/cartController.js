import {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem
} from '../models/cartModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCartController = asyncHandler(async (req, res) => {
  const items = await getCartItems();
  res.json({ items });
});

export const addCartController = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    res.status(400);
    throw new Error('product_id and quantity are required');
  }
  const item = await addCartItem({ productId: Number(product_id), quantity: Number(quantity) });
  res.status(201).json({ item });
});

export const updateCartController = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;
  if (!quantity || Number(quantity) <= 0) {
    res.status(400);
    throw new Error('quantity must be greater than 0');
  }
  const item = await updateCartItem(id, { quantity: Number(quantity) });
  if (!item) {
    res.status(404);
    throw new Error('Cart item not found');
  }
  res.json({ item });
});

export const deleteCartController = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await deleteCartItem(id);
  if (!deleted) {
    res.status(404);
    throw new Error('Cart item not found');
  }
  res.status(204).send();
});

