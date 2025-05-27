'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRecentlyViewed } from './use-recently-viewed';

export function RecentlyViewedProducts() {
  const { recentlyViewed, clearAll } = useRecentlyViewed();
  const [isExpanded, setIsExpanded] = useState(true);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recently Viewed</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
            aria-label="Clear all recently viewed products"
          >
            Clear All
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              {recentlyViewed.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="flex items-center gap-4"
                >
                  <Link
                    href={`/product/${product.handle}`}
                    className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-md"
                  >
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${product.handle}`}
                      className="text-sm font-medium text-gray-900 hover:text-gray-600 truncate block"
                    >
                      {product.title}
                    </Link>
                    <Price
                      amount={product.priceRange.minVariantPrice.amount}
                      currencyCode={product.priceRange.minVariantPrice.currencyCode}
                      className="text-sm text-gray-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 