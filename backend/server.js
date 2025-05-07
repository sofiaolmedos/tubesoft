const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Conexión con la base de datos SQL
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

// Definición de modelo para el carrito
const Cart = sequelize.define('Cart', {
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Definición de modelo para productos
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
});

User.hasMany(Cart);
Cart.belongsTo(User);
Cart.hasMany(Product);
Product.belongsTo(Cart);

// Endpoint para crear un carrito
app.post('/cart', async (req, res) => {
  const { name, email, products } = req.body;

  if (!name || !email || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }
  try {
    let total = 0;
    for (const p of products) {
      if (!p.name || typeof p.price !== 'number' || typeof p.quantity !== 'number') {
        return res.status(400).json({ error: 'Datos de producto inválidos' });
      }
      total += p.price * p.quantity;
    }

    const [user] = await User.findOrCreate({ where: { email }, defaults: { name } });

    const cart = await Cart.create({ total, UserId: user.id });

    for (const p of products) {
      await Product.create({ ...p, CartId: cart.id });
    }
    res.status(201).json({ message: 'Carrito creado exitosamente', cartId: cart.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Iniciar servidor
app.listen(3000, async () => {
  await sequelize.sync();
  console.log('Server is running on http://localhost:3000');
});