import ProductsTable from '@/components/ProductsTable';
import PageTitleBox from '@/components/PageTitleBox';
import { useProductsList } from '@/models/product';
import { Box, Grid, LinearProgress } from '@mui/material';
import { useState } from 'react';

export default function ProductsPage() {
  const [params] = useState({ name: '', description: '' });
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 20,
  });
  const {
    data: products,
    isLoading,
    create,
  } = useProductsList(paginationModel.page, paginationModel.pageSize, params);

  function handlePaginationModelChange(newPaginationModel: {
    page: number;
    pageSize: number;
  }) {
    if (
      newPaginationModel.page !== paginationModel.page &&
      newPaginationModel.page > 0
    ) {
      setPaginationModel(newPaginationModel);
    }
  }

  return (
    <Box>
      <PageTitleBox title="Products" />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <ProductsTable
                products={products.results}
                isLoading={isLoading}
                onCreate={create}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                count={products.count}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
