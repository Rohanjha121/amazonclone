import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCart } from '../hooks/useCart';

const CATEGORIES = [
  { id: '', label: 'All' },
  { id: '1', label: 'Electronics' },
  { id: '2', label: 'Clothing' },
  { id: '3', label: 'Books' },
  { id: '4', label: 'Home' }
];

function Navbar() {
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('category', value);
    } else {
      next.delete('category');
    }
    next.set('page', '1');
    setSearchParams(next);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-amazon-blue text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 md:py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 whitespace-nowrap px-2 py-1 hover:outline hover:outline-1 hover:outline-white"
        >
          <span className="text-xl font-bold tracking-tight text-amazon-yellow">
            amazon
          </span>
          <span className="text-sm font-semibold align-top">.in</span>
          <span className="ml-0.5 h-1 w-6 rounded-full bg-amazon-yellow translate-y-1" />
        </Link>

        {/* Deliver to */}
        <button
          type="button"
          className="hidden flex-col px-2 py-1 text-left text-xs leading-tight hover:outline hover:outline-1 hover:outline-white md:flex"
        >
          <span className="text-[11px] text-gray-300">Deliver to</span>
          <span className="font-semibold text-white">Your Address</span>
        </button>

        {/* Category + Search */}
        <div className="flex flex-1 items-stretch">
          <div className="hidden md:block">
            <select
              value={currentCategory}
              onChange={handleCategoryChange}
              className="h-full rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-2 text-xs text-black"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id || 'all'} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>

        {/* Right cluster: language, account, returns & orders, wishlist, cart */}
        <nav className="hidden items-center gap-3 text-xs md:flex md:text-sm">
          {/* Language */}
          <button className="flex items-center gap-1 px-2 py-1 hover:outline hover:outline-1 hover:outline-white">
            <span className="text-xs font-semibold">EN</span>
          </button>

          {/* Login / Signup */}
          <Link
            to="/auth"
            className="flex flex-col px-2 py-1 text-left leading-tight hover:outline hover:outline-1 hover:outline-white"
          >
            <span className="text-[11px] text-gray-200">Hello, sign in</span>
            <span className="text-xs font-semibold text-white">
              Login &amp; Signup
            </span>
          </Link>

          {/* Returns & Orders */}
          <Link
            to="/orders"
            className="flex flex-col px-2 py-1 text-left leading-tight hover:outline hover:outline-1 hover:outline-white"
          >
            <span className="text-[11px] text-gray-200">Returns</span>
            <span className="text-xs font-semibold text-white">&amp; Orders</span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex flex-col px-2 py-1 text-left leading-tight hover:outline hover:outline-1 hover:outline-white"
          >
            <span className="text-[11px] text-gray-200">Your</span>
            <span className="text-xs font-semibold text-white">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1 px-2 py-1 hover:outline hover:outline-1 hover:outline-white"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
              🛒
            </span>
            <span className="font-semibold">Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-amazon-yellow px-1.5 text-xs font-bold text-black">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Compact cart for small screens */}
        <Link
          to="/cart"
          className="relative flex items-center gap-1 px-2 py-1 md:hidden"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
            🛒
          </span>
          {cartItemsCount > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-amazon-yellow px-1.5 text-xs font-bold text-black">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
