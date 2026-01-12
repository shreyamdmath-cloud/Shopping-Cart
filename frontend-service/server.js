const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API Gateway Routing
const AUTH_SERVICE = process.env.AUTH_SERVICE || 'http://localhost:5001';
const GROCERY_SERVICE = process.env.GROCERY_SERVICE || 'http://localhost:5002';
const CART_SERVICE = process.env.CART_SERVICE || 'http://localhost:5003';
const ORDER_SERVICE = process.env.ORDER_SERVICE || 'http://localhost:5004';

app.use('/api/auth', createProxyMiddleware({ target: AUTH_SERVICE, changeOrigin: true, pathRewrite: { '^/api/auth': '' } }));
app.use('/api/groceries', createProxyMiddleware({ target: GROCERY_SERVICE, changeOrigin: true, pathRewrite: { '^/api/groceries': '' } }));
app.use('/api/cart', createProxyMiddleware({ target: CART_SERVICE, changeOrigin: true, pathRewrite: { '^/api/cart': '' } }));
app.use('/api/orders', createProxyMiddleware({ target: ORDER_SERVICE, changeOrigin: true, pathRewrite: { '^/api/orders': '' } }));

app.listen(PORT, () => {
    console.log(`Frontend/Gateway running on port ${PORT}`);
});
