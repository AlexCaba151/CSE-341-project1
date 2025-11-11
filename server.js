const express = require('express');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');
const database = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//  CORS 
app.use(cors({
  origin: '*', // permite todo origen (útil para pruebas y Swagger)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 👇 luego el parser de JSON
app.use(express.json());

// 👇 y luego las rutas
app.use('/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

database.initDb((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
