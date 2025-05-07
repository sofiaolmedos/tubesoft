'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Image from 'next/image';
import carrito from './assets/cart.png';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Image
        src={carrito} 
        alt={'Carrito'}
        width={50} 
        height={50} 
        placeholder="blur" 
        blurDataURL={carrito.blurDataURL} 
      />
      <List>
        {items.map(item => (
          <div key={item.id}>
            <ListItem>
              <ListItemText
                primary={`${item.name} x${item.quantity}`}
                secondary={`Subtotal: $${(item.price * item.quantity).toFixed(2)}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
        <ListItem>
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default Cart;
