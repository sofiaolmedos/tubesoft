// ProductList.js - Componente padre
import React from 'react';
import ProductCard from './ProductCard';
import { Grid, Container, Typography } from '@mui/material';
import peras from './assets/peras.jpg';
import manzanas from './assets/manzana.jpg';

const ProductList = () => {
	// Usar Placehold para imagenes: https://placehold.co/600x400
  const products = [
    {
        id: 1,
        name: 'Manzana',
        description: 'Esta es una excelente manzana.',
        price: 1.99,
        image: manzanas
      },
      {
        id: 2,
        name: 'Pera',
        description: 'Es una buena pera.',
        price: 1.50,
        image: peras
      },
  ];

  return (<Container sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>
      Lista de Productos
    </Typography>
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  </Container>);
};

export default ProductList;