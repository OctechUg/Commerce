'use client';

import { Product } from 'lib/shopify/types';
import { useEffect } from 'react';
import { useRecentlyViewed } from './use-recently-viewed';

export function ProductTracker({ product }: { product: Product }) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    addProduct(product);
  }, [product, addProduct]);

  return null;
} 