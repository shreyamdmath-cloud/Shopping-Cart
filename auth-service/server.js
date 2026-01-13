const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mock database
const users = [
    { username: 'admin', password: 'password123' }
];

// Registration Endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    users.push({ username, password });
    res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Return a mock token
        res.json({ success: true, token: 'mock-jwt-token-for-' + username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Validate Endpoint
app.get('/validate', (req, res) => {
    const token = req.headers['authorization'];
    if (token && token.startsWith('mock-jwt-token-')) {
        res.json({ valid: true, user: token.split('-').pop() });
    } else {
        res.status(401).json({ valid: false });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Auth Service running on port ${PORT} (0.0.0.0)`);
});
