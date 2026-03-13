import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import BankOffers from '../components/BankOffers';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import api from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/products/${id}`);
        if (isMounted) {
          setProduct(data.product);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    async function fetchRelated() {
      if (!product?.category_id) {
        return;
      }

      try {
        const { data } = await api.get('/products', {
          params: { category: product.category_id, limit: 4 }
        });
        const items = (data.products || []).filter(
          (item) => String(item.id) !== String(product.id)
        );
        setRelated(items);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRelated();
  }, [product]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-8 animate-pulse lg:grid-cols-[1.2fr,1fr]">
          <div className="h-[480px] rounded-md bg-gray-200" />
          <div className="space-y-4 rounded-md bg-white p-4 shadow-sm">
            <div className="h-7 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-10 w-1/4 rounded bg-gray-200" />
            <div className="h-28 rounded bg-gray-200" />
            <div className="h-40 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600">
        Failed to load product. Please try again.
      </div>
    );
  }

  if (!product) {
    return <div className="p-4">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    addToast({
      type: 'success',
      message: `${product.name} added to cart`
    });
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const productDescription = product.description || 'No description provided.';
  const stockMessage =
    product.stock > 0
      ? product.stock < 5
        ? `Only ${product.stock} left in stock. Order soon.`
        : `${product.stock} units available in stock.`
      : 'This item is currently out of stock.';

  const specificationItems = [
    { label: 'Category', value: product.category_name || 'N/A' },
    { label: 'Price', value: `Rs. ${Number(product.price).toFixed(2)}` },
    { label: 'Rating', value: `${product.rating || 0} / 5` },
    { label: 'Reviews', value: `${product.review_count || 0} ratings` },
    {
      label: 'Availability',
      value: product.stock > 0 ? 'In Stock' : 'Out of Stock'
    },
    {
      label: 'Added On',
      value: new Date(product.created_at).toLocaleDateString()
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-8 lg:grid-cols-[1.15fr,1fr]">
        <div className="rounded-md bg-white p-4 shadow-sm">
          <ImageCarousel images={images} productName={product.name} />
        </div>

        <div className="flex flex-col gap-4">
          <section className="rounded-md bg-white p-5 shadow-sm">
            <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

            <div className="mt-2 flex items-center gap-3">
              <RatingStars
                rating={product.rating}
                count={product.review_count}
              />
              {product.review_count > 0 && (
                <span className="text-sm text-blue-600">
                  {product.review_count} ratings
                </span>
              )}
            </div>

            <div className="mt-5 border-t border-b border-gray-200 py-4">
              <div className="text-sm text-gray-500">Price</div>
              <div className="mt-1 text-4xl font-semibold text-[#b12704]">
                Rs. {Number(product.price).toFixed(2)}
              </div>
            </div>

            <div className="mt-4">
              <div
                className={`text-sm font-semibold ${
                  product.stock > 0
                    ? product.stock < 5
                      ? 'text-orange-600'
                      : 'text-green-700'
                    : 'text-red-600'
                }`}
              >
                {stockMessage}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="rounded-full bg-amazon-yellow px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Buy Now
              </button>
            </div>
          </section>

          <BankOffers />

          <section className="rounded-md bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Product Description</h2>
            <p className="mt-3 leading-7 text-gray-700">{productDescription}</p>
          </section>

          <section className="rounded-md bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {specificationItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-gray-200 bg-gray-50 p-3"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-900">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-8 max-w-7xl px-4">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Customers also bought
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
