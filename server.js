const express = require('express');
const contactsRoutes = require('./routes/contacts');
const database = require('./data/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/contacts', contactsRoutes);

// Inicializa la DB y luego inicia el servidor
database.initDb((err) => {
    if(err){
        console.error('Error connecting to database:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});


