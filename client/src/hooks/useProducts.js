import { useState, useCallback } from 'react';
import { getAllProducts, getProductById } from '../services/productService';

export function useProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts(filters);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getProduct = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(productId);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getProducts,
    getProduct,
  };
}
