import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import api from '../services/api';

function Checkout() {
  const { items, total, clearCart } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!items.length) return;

    const shippingAddress = `${form.name}, ${form.phone}, ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;

    try {
      setIsPlacingOrder(true);
      const { data } = await api.post('/orders', {
        items: items.map((i) => ({
          product_id: i.id,
          quantity: i.quantity
        })),
        shippingAddress
      });
      clearCart();
      navigate(`/order-success/${data.order.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-[2fr,1.3fr]">
        <form
          onSubmit={handlePlaceOrder}
          className="space-y-4 rounded-md bg-white p-4 shadow-sm"
        >
          <div>
            <h2 className="mb-2 text-lg font-semibold">Shipping address</h2>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Full name"
            />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Phone number"
            />
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="Address"
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                required
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                placeholder="City"
              />
              <input
                required
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                placeholder="State"
              />
              <input
                required
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                placeholder="Pincode"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-700">
              You will pay:{' '}
              <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={isPlacingOrder || !items.length}
              className="rounded-md bg-amazon-yellow px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPlacingOrder ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-md bg-white p-4 text-sm shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Order summary</h2>
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="mb-3 max-h-60 space-y-2 overflow-y-auto border-b border-gray-200 pb-3">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-700">
                      <div>₹{item.price.toFixed(2)}</div>
                      <div className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between">
                <span className="text-gray-700">Items:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-900">Order total:</span>
                <span className="text-lg font-semibold">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
