'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { PageToolbar } from '@/components/ui/page-toolbar';
import { CircularProgress, Container, Divider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { fetchApiData } from '@/data-access/fetch-api-data';
// import { MapHome } from '@/components/map-home';
import dynamic from 'next/dynamic';
import { ImageOrDatasetField } from '../dataset/image-or-dataset-field';

const MapHome = dynamic(() => import('@/components/map-home').then(mod => mod.default), {
  ssr: false
});

function ImagePageContent() {
  // const data = await getCatalogDetails(params);
  // const datasets = await getCatalogDatasets(params);
  const [image, setImage] = useState<any>(null);
  const [dataset, setDataset] = useState<any>(null);
  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id');
  const datasetId = searchParams.get('dataset_id');

  useEffect(() => {
    fetchApiData(`images/${paramsId}?replace_dataset=True`, setImage);
    fetchApiData(`datasets/${datasetId}?include_images=False`, setDataset);
  }, [setImage, setDataset, datasetId, paramsId]);

  if (!image || !dataset) {
    return <CircularProgress />;
  }
  return (
    <React.Fragment>
      <PageToolbar
        title={image?.name}
        divider={false}
        previous={{
          url: `dataset?id=${image.dataset_id}`,
          name: dataset?.name || 'Dataset'
        }}
      />
      <div className="px-4 py-2 text-sm text-gray-600">
        <div className="">
          <p>
            <strong>Description:</strong>
          </p>
          <p className="break-words break-all whitespace-normal">{image?.abstract}</p>
        </div>
      </div>
      <Divider />
      <Container>
        <div className="py-10">
          <h2 className="text-xl font-bold mb-1">Images</h2>
          <div className="flex gap-10">
            <div className="w-[50%]">
              <MapHome image={image} />
            </div>
            <div className="flex-1">
              {image.handle ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.handle}
                  alt={image.name}
                  className="h-[500px] w-auto rounded shadow-sm"
                />
              ) : (
                <p className="text-red-500">No image available</p>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(image)
            .filter(key => !['dataset_id', 'id', 'name', 'abstract', 'handle'].includes(key))
            .map(key => (
              <ImageOrDatasetField key={key} name={key} value={image[key]} />
            ))}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default function DatasetPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ImagePageContent />
    </Suspense>
  );
}
