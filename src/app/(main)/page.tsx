import React from 'react';
import { PageToolbar } from '@/components/ui/page-toolbar';
import { Container } from '@mui/material';
import { SearchCatalog } from '@/app/(main)/search-catalog';
import { CatalogList } from '@/app/(main)/catalog-list';

export default async function Page() {
  return (
    <React.Fragment>
      <PageToolbar title="iFDO Browser" />
      <Container>
        <SearchCatalog />
        <CatalogList />
      </Container>
    </React.Fragment>
  );
}
