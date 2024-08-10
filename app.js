const express = require('express');
const dbConnection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


dbConnection();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', userRoutes);


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/home.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));


const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
