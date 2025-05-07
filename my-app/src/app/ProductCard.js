// ProductCard.js - Componente hijo
'use client';
import React from 'react';
import { Card, Typography, CardContent, CardActions, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from './redux/cartSlice';
import Image from 'next/image';

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  return (<Card sx={{ maxWidth: 345 }}>
    <Image
      src={product.image.src} 
      alt={product.name}
      width={300} 
      height={300} 
      placeholder="blur" 
      blurDataURL={product.image.blurDataURL} 
    />
    <CardContent>
      <Typography gutterBottom variant="h6">{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">{product.description}</Typography>
      <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>${product.price}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => dispatch(addToCart(product))}>Agregar</Button>
      <Button size="small" onClick={() => dispatch(removeFromCart(product.id))}>Eliminar</Button>
    </CardActions>
  </Card>
)};

export default ProductCard;