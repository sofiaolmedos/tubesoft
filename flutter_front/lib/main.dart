import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
	  // Escribir Stateless Widget aquí...
    return MaterialApp(
      title: 'Lista de Productos',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ProductList(),
    );
  }
}

class ProductList extends StatefulWidget {
  @override
  _ProductListState createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  late Future<List<Product>> products;

  Future<List<Product>> fetchProducts() async {
    final response = await http.get(Uri.parse('https://fakestoreapi.com/products'));
    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((product) => Product.fromJson(product)).toList();
    } else {
      throw Exception('Error al cargar productos');
    }
  }

  @override
  void initState() {
    super.initState();
    products = fetchProducts();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Lista de Productos')),
      body: FutureBuilder<List<Product>>(
        future: products,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No hay productos'));
          } 
          List<Product> productList = snapshot.data!;
          return ListView.builder(
            itemCount: productList.length,
            itemBuilder: (context, index) {
              return ListTile(
                leading: Image.network(productList[index].image),
                title: Text(productList[index].name),
                subtitle: Text('\$${productList[index].price}'),
              );
            },
          );
        },
      ),
    );
  }
}

class Product {
  final String name;
  final double price;
  final String image;

  Product({required this.name, required this.price, required this.image});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      name: json['title'] ?? 'Sin nombre',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      image: json['image'] ?? '',
    );
  }
}

