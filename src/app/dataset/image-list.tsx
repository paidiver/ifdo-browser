'use client';
import React from 'react';
import { FilterImages } from './filter-images';
import Link from 'next/link';

interface ImageListProps {
  images: any;
  dataset: any;
}

export function ImageList({ images, dataset }: ImageListProps) {
  return (
    <div>
      <FilterImages />
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map(item => (
          <Link
            key={item.id}
            href={`/image?id=${item.id}&dataset_id=${dataset.id}`}
            className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow break-words break-all whitespace-normal"
          >
            <h3 className="text-md font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Lat: </strong>
              {parseFloat(item.latitude).toFixed(4)}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Lng:</strong>
              {parseFloat(item.longitude).toFixed(4)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
