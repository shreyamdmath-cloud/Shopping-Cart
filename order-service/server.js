const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// In-memory orders
let orders = [];

// GET orders for a user
app.get('/orders/:user', (req, res) => {
    const user = req.params.user;
    const userOrders = orders.filter(o => o.user === user);
    res.json(userOrders);
});

// POST place order
app.post('/orders', (req, res) => {
    const order = {
        id: orders.length + 1,
        user: req.body.user,
        items: req.body.items,
        total: req.body.total,
        status: 'Placed',
        date: new Date().toISOString()
    };
    orders.push(order);
    res.status(201).json(order);
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
