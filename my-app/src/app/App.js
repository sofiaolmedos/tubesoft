import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import { Container, Grid } from '@mui/material';

const App = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
