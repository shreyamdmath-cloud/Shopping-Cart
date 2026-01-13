const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// In-memory cart (for simplicity in lab)
// Key: username/session, Value: Array of items
let carts = {};

// GET cart for a user
app.get('/cart/:user', (req, res) => {
    const user = req.params.user;
    res.json(carts[user] || []);
});

// POST add item to cart
app.post('/cart/:user', (req, res) => {
    const user = req.params.user;
    const item = req.body; // { id, name, price, quantity }

    if (!carts[user]) {
        carts[user] = [];
    }

    // Check if item exists, increment quantity
    const existing = carts[user].find(i => i.id === item.id);
    if (existing) {
        existing.quantity += (item.quantity || 1);
    } else {
        carts[user].push({ ...item, quantity: item.quantity || 1 });
    }

    res.status(201).json(carts[user]);
});

// DELETE item from cart
app.delete('/cart/:user/:id', (req, res) => {
    const { user, id } = req.params;
    if (carts[user]) {
        carts[user] = carts[user].filter(i => i.id !== parseInt(id));
    }
    res.status(204).send();
});

// DELETE clear cart (after order)
app.delete('/cart/:user', (req, res) => {
    const user = req.params.user;
    carts[user] = [];
    res.status(204).send();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cart Service running on port ${PORT} (0.0.0.0)`);
});
