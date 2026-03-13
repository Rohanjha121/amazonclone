import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    addToast({
      type: 'success',
      message: `${product.name} added to cart`
    });
  };

  return (
    <article className="group flex min-h-[380px] flex-col rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/product/${product.id}`}
        className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-sm bg-white"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-teal-700">
        {product.category_name || 'Amazon Choice'}
      </div>

      <Link
        to={`/product/${product.id}`}
        className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 hover:text-[#c7511f]"
      >
        {product.name}
      </Link>

      <div className="mt-2">
        <RatingStars rating={product.rating} count={product.review_count} />
      </div>

      <div className="mt-3 text-2xl font-medium text-gray-900">
        Rs. {Number(product.price).toFixed(2)}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-auto inline-flex w-fit rounded-full bg-amazon-yellow px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
