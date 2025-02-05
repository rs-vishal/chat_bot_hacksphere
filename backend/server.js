require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./db'); 

const app = express();
app.use(cors());
app.use(express.json());


app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Basic validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Please provide all fields' });
        }

        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        await db.query(sql, [name, email, hashedPassword, role]);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        // Find user by email
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return user details along with token
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            phone: user.phone,
            token: token
        };

        res.status(200).json({ message: 'Login successful', userDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Add Product Route
app.post('/add_product', async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const sql = 'INSERT INTO products (name, price, description, category) VALUES (?, ?, ?, ?)';
        await db.query(sql, [name, price, description, category]);
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch All Products
app.get('/products', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
