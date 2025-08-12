// app/catalog/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { PageToolbar } from '@/components/ui/page-toolbar';
import { CircularProgress, Container, Divider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { fetchApiData } from '@/data-access/fetch-api-data';
import { ImportDataset } from './import-dataset';
import { DatasetList } from './dataset-list';

function CatalogPageContent() {
  const [catalog, setCatalog] = useState<any>(null);
  const [datasets, setDatasets] = useState(null);

  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id');

  useEffect(() => {
    fetchApiData('catalogs/', setCatalog);
  }, [setCatalog, paramsId]);

  useEffect(() => {
    fetchApiData('datasets/', setDatasets);
  }, [setDatasets]);

  if (!catalog) {
    return <CircularProgress />;
  }

  return (
    <>
      <PageToolbar
        title={catalog?.name}
        divider={false}
        previous={{
          url: '',
          name: 'Catalogs'
        }}
      />
      <div className="px-4 py-2 text-sm text-gray-600">
        <p>
          <strong>Description:</strong>
        </p>
        <p>{catalog?.description}</p>
      </div>
      <div className="px-4">
        <ImportDataset />
      </div>
      <Divider />
      <Container>
        {datasets === null ? (
          <CircularProgress />
        ) : (
          <DatasetList datasets={datasets} catalog={catalog} />
        )}
      </Container>
    </>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <CatalogPageContent />
    </Suspense>
  );
}
