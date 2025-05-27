import { Product } from 'lib/shopify/types';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recently-viewed-products';
const MAX_ITEMS = 5;

export type RecentlyViewedProduct = Pick<Product, 'id' | 'handle' | 'title' | 'featuredImage' | 'priceRange'>;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recently viewed products:', e);
      }
    }
  }, []);

  const addProduct = (product: Product) => {
    setRecentlyViewed((current) => {
      // Remove the product if it already exists
      const filtered = current.filter((p) => p.id !== product.id);
      
      // Add the new product to the beginning
      const updated = [
        {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: product.featuredImage,
          priceRange: product.priceRange
        },
        ...filtered
      ].slice(0, MAX_ITEMS); // Keep only the most recent 5 items

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      return updated;
    });
  };

  const clearAll = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    recentlyViewed,
    addProduct,
    clearAll
  };
} 