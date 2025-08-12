'use client';
import { DEFAULT_CATALOGS } from '@/application/data/catalog-data';
import Link from 'next/link';
import React from 'react';

export function CatalogList() {
  return (
    <div className="py-2">
      <p>... or select one from iFDO index</p>
      <div className="pt-4">
        {DEFAULT_CATALOGS.map(item => (
          <Link
            key={item.id}
            href={`/catalog?id=${item.id}`}
            className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
