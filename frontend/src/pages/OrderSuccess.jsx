import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchOrder() {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        if (isMounted) setOrder(data.order);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (orderId) {
      fetchOrder();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const totalAmount = order ? Number(order.total_amount) : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-md bg-white p-6 text-sm shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-green-700">
          Your order has been placed successfully.
        </h1>
        <p className="mb-4 text-gray-700">
          Thank you for shopping with us. You will receive an email confirmation
          shortly if this were a real store.
        </p>

        <div className="mb-4 border-b border-gray-200 pb-3">
          <div className="text-gray-700">
            <span className="font-semibold">Order ID:</span>{' '}
            <span className="font-mono">{orderId}</span>
          </div>
        </div>

        {isLoading && <p>Loading order details...</p>}
        {error && (
          <p className="text-red-600">
            Failed to load order details. Please try again later.
          </p>
        )}

        {!isLoading && !error && order && (
          <>
            <div className="mb-4">
              <h2 className="mb-1 text-base font-semibold">Shipping address</h2>
              <p className="whitespace-pre-wrap text-gray-800">
                {order.shipping_address}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="mb-1 text-base font-semibold">Ordered products</h2>
              <ul className="space-y-2">
                {order.items?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-gray-800"
                  >
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-700">
                      <div>₹{Number(item.price).toFixed(2)}</div>
                      <div className="font-semibold">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 flex justify-between text-base">
              <span className="font-semibold">Total amount:</span>
              <span className="font-semibold">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </>
        )}

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="rounded-md bg-amazon-yellow px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
