import { useEffect, useState } from 'react';
import api from '../services/api';

const PAGE_SIZE = 20;

/**
 * Fetch products with optional search, category filter, and pagination.
 *
 * @param {Object} options
 * @param {string} [options.query]
 * @param {number} [options.page]
 * @param {number|string} [options.categoryId]
 */
export function useProducts({ query = '', page = 1, categoryId } = {}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1
  });

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const isSearch = query && query.trim().length > 0;

        const params = {
          page,
          limit: PAGE_SIZE
        };

        if (categoryId) {
          params.category = categoryId;
        }

        if (isSearch) {
          params.q = query.trim();
        }

        const endpoint = isSearch ? '/products/search' : '/products';

        const { data } = await api.get(endpoint, { params });

        setProducts(data.products || []);
        if (data.pagination) {
          setPagination(data.pagination);
        } else {
          setPagination((prev) => ({
            ...prev,
            page,
            limit: PAGE_SIZE,
            total: data.products ? data.products.length : 0,
            totalPages: 1
          }));
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [query, page, categoryId]);

  return { products, isLoading, error, pagination };
}
