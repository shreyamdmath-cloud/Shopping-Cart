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

const proxyOptions = (target) => ({
    target,
    changeOrigin: true,
    pathRewrite: (path) => path.replace(/^\/api\/[^\/]+/, ''),
    proxyTimeout: 30000, // 30 seconds to wait for backend response
    timeout: 30000,      // 30 seconds for connection
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Gateway] Routing ${req.method} ${req.url} -> ${target}`);
    },
    onError: (err, req, res) => {
        console.error(`[Gateway] ERROR proxying to ${target}${req.url}:`, err.message);
        res.status(503).json({
            error: 'Service unavailable',
            message: 'The backend service is currently starting up or unreachable. Please try again in a few seconds.',
            target: target
        });
    }
});

app.use('/api/auth', createProxyMiddleware(proxyOptions(AUTH_SERVICE)));
app.use('/api/groceries', createProxyMiddleware(proxyOptions(GROCERY_SERVICE)));
app.use('/api/cart', createProxyMiddleware(proxyOptions(CART_SERVICE)));
app.use('/api/orders', createProxyMiddleware(proxyOptions(ORDER_SERVICE)));

app.listen(PORT, () => {
    console.log(`Frontend/Gateway running on port ${PORT}`);
});
