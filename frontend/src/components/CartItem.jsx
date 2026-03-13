import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { addToast } = useToast();

  const handleQuantityChange = (value) => {
    updateQuantity(item.id, value);
    addToast({
      type: 'info',
      message: `Updated quantity for ${item.name}`
    });
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    addToast({
      type: 'success',
      message: `${item.name} removed from cart`
    });
  };

  return (
    <div className="flex gap-4 border-b border-gray-200 py-4">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="h-24 w-24 flex-shrink-0 object-contain"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-gray-600">₹{item.price}</div>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <label htmlFor={`qty-${item.id}`}>Qty:</label>
          <select
            id={`qty-${item.id}`}
            value={item.quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="rounded border border-gray-300 bg-white px-2 py-1"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleRemove}
            className="text-sm text-blue-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
