import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';

function Cart() {
  const { items, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          <p>Your Amazon clone cart is empty.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="rounded-md bg-white p-4 shadow-sm">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <aside className="rounded-md bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm">
              Subtotal ({items.length} items):{' '}
              <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-2 w-full rounded-md bg-amazon-yellow py-2 text-sm font-semibold text-black hover:bg-yellow-400"
            >
              Proceed to checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
