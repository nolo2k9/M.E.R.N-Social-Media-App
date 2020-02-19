//Main Entry file

// initialise server
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

// Initialise Middleware
app.use(express.json({extended: false}));

app.get("/", (req, res) => res.send("API Running"));

// Define our routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000; // Looks for environment variable from desired server or default
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
