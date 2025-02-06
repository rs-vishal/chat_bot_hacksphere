require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./db'); // Assuming you have your DB setup here

const app = express();
app.use(cors());
app.use(express.json());

// Function to check database connection
const checkDatabaseConnection = async () => {
    try {
        await db.query('SELECT 1'); // Simple query to check connection
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process if database connection fails
    }
};

// Check database connection when the server starts
checkDatabaseConnection();

app.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, role, location } = req.body;

        // Check if all fields are provided
        if (!name || !email || !phone || !password || !role || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const insertUserQuery = `
            INSERT INTO users (name, role, location, phone, password, email) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;
        const newUser = await db.query(insertUserQuery, [name, role, location, phone, hashedPassword, email]);

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });

    } catch (error) {
        // Log and respond with error message
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

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
        console.error('Login error: ', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
