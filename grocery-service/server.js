const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/grocery_db';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Grocery Schema
const grocerySchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    category: String,
    unit: String
});

const Grocery = mongoose.model('Grocery', grocerySchema);

// Seed initial data (overwrites DB with code values for lab consistency)
async function seedData() {
    try {
        await Grocery.deleteMany({}); // Clear existing data to reflect code changes
        await Grocery.insertMany([
            { id: 1, name: 'Fresh Vegetables', price: 60.00, category: 'Vegetables', unit: 'kg' },
            { id: 2, name: 'Fruits Bundle', price: 60.00, category: 'Fruits', unit: 'kg' },
            { id: 3, name: 'Premium Rice', price: 55.00, category: 'Grains', unit: 'kg' },
            { id: 4, name: 'Organic Milk', price: 30.00, category: 'Dairy', unit: 'litre' },
            { id: 5, name: 'Cooking Oil', price: 140.00, category: 'Oils', unit: 'litre' },
            { id: 6, name: 'Fresh Tomatoes', price: 40.00, category: 'Vegetables', unit: 'kg' },
            { id: 7, name: 'Organic Potatoes', price: 35.00, category: 'Vegetables', unit: 'kg' },
            { id: 8, name: 'Basmati Rice', price: 120.00, category: 'Grains', unit: 'kg' },
            { id: 9, name: 'Whole Wheat Flour', price: 45.00, category: 'Grains', unit: 'kg' },
            { id: 10, name: 'Fresh Paneer', price: 200.00, category: 'Dairy', unit: 'kg' },
            { id: 11, name: 'Curd', price: 50.00, category: 'Dairy', unit: 'litre' },
            { id: 12, name: 'Premium Almonds', price: 600.00, category: 'Nuts', unit: 'kg' },
            { id: 13, name: 'Cashew Nuts', price: 550.00, category: 'Nuts', unit: 'kg' },
            { id: 14, name: 'Tea Powder', price: 180.00, category: 'Beverages', unit: 'kg' },
            { id: 15, name: 'Coffee Powder', price: 350.00, category: 'Beverages', unit: 'kg' }
        ]);
        console.log('Database synced with initial groceries from code');
    } catch (err) {
        console.error('Seed failed', err);
    }
}
seedData();

// GET all groceries
app.get('/groceries', async (req, res) => {
    try {
        const groceries = await Grocery.find();
        res.json(groceries);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// POST new grocery item
app.post('/groceries', async (req, res) => {
    try {
        const newItem = new Grocery(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// PUT update grocery
app.put('/groceries/:id', async (req, res) => {
    try {
        const updated = await Grocery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updated) res.json(updated);
        else res.status(404).send('Grocery item not found');
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE grocery item
app.delete('/groceries/:id', async (req, res) => {
    try {
        await Grocery.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Grocery Service running on port ${PORT}`);
});
