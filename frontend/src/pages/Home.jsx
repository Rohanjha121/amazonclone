import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import Hero from '../components/Hero';

const CATEGORIES = [
  { id: '', label: 'All Departments' },
  { id: '1', label: 'Electronics' },
  { id: '2', label: 'Clothing' },
  { id: '3', label: 'Books' },
  { id: '4', label: 'Home' }
];

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category') || '';
  const page = Number(searchParams.get('page') || '1');
  const activeCategory =
    CATEGORIES.find((category) => category.id === categoryId)?.label ||
    'All Departments';

  const { products, isLoading, error, pagination } = useProducts({
    query,
    page,
    categoryId: categoryId || undefined
  });

  const handleCategoryChange = (newCategoryId) => {
    const next = new URLSearchParams(searchParams);
    if (newCategoryId) {
      next.set('category', newCategoryId);
    } else {
      next.delete('category');
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (pagination?.totalPages || 1)) {
      return;
    }

    const next = new URLSearchParams(searchParams);
    next.set('page', String(newPage));
    setSearchParams(next);
  };

  const renderSkeletonGrid = () => {
    const items = Array.from({ length: 8 });
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="flex min-h-[380px] flex-col rounded-md border border-gray-200 bg-white p-4 shadow-sm animate-pulse"
          >
            <div className="mb-4 h-48 w-full rounded bg-gray-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
            <div className="mb-4 h-6 w-1/3 rounded bg-gray-200" />
            <div className="mt-auto h-9 w-32 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    );
  };

  const pageNumbers = Array.from(
    { length: pagination?.totalPages || 1 },
    (_, i) => i + 1
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <Hero />

      <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-24 md:-mt-32 lg:-mt-40">
        <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
          <aside className="hidden rounded-md bg-white p-4 text-sm shadow-sm lg:block">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Departments
            </h2>
            <ul className="space-y-1">
              {CATEGORIES.map((category) => (
                <li key={category.id || 'all'}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full rounded px-2 py-1.5 text-left transition ${
                      categoryId === category.id
                        ? 'bg-amber-50 font-semibold text-amber-700'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-amazon-blue'
                    }`}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section>
            <div className="mb-4 rounded-md bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {query ? `Results for "${query}"` : 'Featured Products'}
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    {pagination.total} product{pagination.total === 1 ? '' : 's'} in {activeCategory}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 lg:hidden">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id || 'all-mobile'}
                      type="button"
                      onClick={() => handleCategoryChange(category.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        categoryId === category.id
                          ? 'border-amber-400 bg-amber-100 font-semibold text-amber-800'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <p className="mb-3 text-sm text-red-600">
                Failed to load products. Please try again.
              </p>
            )}

            {isLoading ? (
              renderSkeletonGrid()
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!isLoading && products.length === 0 && !error && (
              <div className="rounded-md bg-white p-6 text-sm text-gray-700 shadow-sm">
                No products found. Try adjusting your search or category filter.
              </div>
            )}

            {pagination?.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="rounded border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Prev
                </button>

                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePageChange(num)}
                    className={`h-8 w-8 rounded text-center ${
                      num === page
                        ? 'bg-amazon-yellow font-semibold text-black'
                        : 'border border-gray-300 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= (pagination?.totalPages || 1)}
                  className="rounded border border-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
