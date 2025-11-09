const router = require('express').Router();

const contactsRoutes = require('./contacts');

// Ruta principal
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rutas de contactos
router.use('/contacts', contactsRoutes);

module.exports = router;
