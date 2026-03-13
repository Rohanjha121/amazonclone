import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function SearchBar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(searchParamQuery);
  const navigate = useNavigate();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    setQuery(searchParamQuery);
  }, [searchParamQuery]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (query.trim()) {
          params.set('q', query.trim());
        } else {
          params.delete('q');
        }
        params.set('page', '1');
        return params;
      });

      if (location.pathname !== '/') {
        navigate('/');
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [location.pathname, navigate, query, setSearchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }
      params.set('page', '1');
      return params;
    });
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden rounded-md bg-white focus-within:ring-2 focus-within:ring-amazon-yellow"
    >
      <input
        type="text"
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-3 py-2 text-sm text-black outline-none"
      />
      <button
        type="submit"
        className="bg-amazon-yellow px-4 text-sm font-semibold text-black hover:bg-yellow-400"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
