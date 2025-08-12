'use client';
import React from 'react';
import { FilterDatasets } from './filter-datasets';
import Link from 'next/link';

interface DatasetListProps {
  datasets: any;
  catalog: any;
}

export function DatasetList({ datasets, catalog }: DatasetListProps) {
  return (
    <div className="py-10">
      <h2 className="text-xl font-bold mb-1">Datasets</h2>
      <FilterDatasets />
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map(item => (
          <Link
            key={item.id}
            href={`/dataset?id=${item.id}&catalog_id=${catalog.name}`}
            className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-md font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-2">
              {item.abstract.length > 100 ? `${item.abstract.slice(0, 200)}...` : item.abstract}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
