'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { PageToolbar } from '@/components/ui/page-toolbar';
import { Button, CircularProgress, Container, Divider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { fetchApiData } from '@/data-access/fetch-api-data';
import { ImageList } from './image-list';
import { ImageOrDatasetField } from './image-or-dataset-field';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { MapHome } from '@/components/map-home';
import dynamic from 'next/dynamic';

const MapHome = dynamic(() => import('@/components/map-home').then(mod => mod.default), {
  ssr: false
});

function DatasetPageContent() {
  // const data = await getCatalogDetails(params);
  // const datasets = await getCatalogDatasets(params);
  const [dataset, setDataset] = useState<any>(null);
  const [catalog, setCatalog] = useState<any>(null);
  const [showMoreDatasetInfo, setShowMoreDatasetInfo] = useState(false);
  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id');
  const catalogId = searchParams.get('catalog_id');

  useEffect(() => {
    fetchApiData('catalogs/', setCatalog);
  }, [setCatalog, paramsId]);

  useEffect(() => {
    fetchApiData(`datasets/${paramsId}?include_images=True`, setDataset);
  }, [setDataset, paramsId]);

  if (!dataset || !catalog) {
    return <CircularProgress />;
  }
  return (
    <React.Fragment>
      <PageToolbar
        title={dataset?.name}
        divider={false}
        previous={{
          url: `catalog?id=${catalogId}`,
          name: catalog?.name || 'Catalog'
        }}
      />
      <div className="px-4 py-2 text-sm text-gray-600">
        <div className="">
          <p>
            <strong>Description:</strong>
          </p>
          <p className="break-words break-all whitespace-normal">{dataset?.abstract}</p>
        </div>
        <div className="px-4">
          <Button
            startIcon={showMoreDatasetInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            onClick={() => setShowMoreDatasetInfo(!showMoreDatasetInfo)}
          >
            {showMoreDatasetInfo ? 'Hide' : 'Show'} Info about the Dataset
          </Button>
        </div>
        {showMoreDatasetInfo && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(dataset)
              .filter(key => !['images', 'id', 'name', 'abstract'].includes(key))
              .map(key => (
                <ImageOrDatasetField key={key} name={key} value={dataset[key]} />
              ))}
          </div>
        )}
      </div>
      <Divider />
      <Container>
        {dataset === null ? (
          <CircularProgress />
        ) : (
          <div className="py-10">
            <h2 className="text-xl font-bold mb-1">Images</h2>
            <div className="flex gap-2">
              <MapHome dataset={dataset} />
              <ImageList images={dataset.images} dataset={dataset} />
            </div>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default function DatasetPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <DatasetPageContent />
    </Suspense>
  );
}
