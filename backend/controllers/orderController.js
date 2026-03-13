import { createOrder, getOrderById } from '../models/orderModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const placeOrderController = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('items array is required');
  }

  const order = await createOrder({
    items,
    shippingAddress
  });

  res.status(201).json({ order });
});

export const getOrderByIdController = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const order = await getOrderById(id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ order });
});

