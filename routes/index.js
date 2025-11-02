const router = require('express').Router();

//uter.get('/', (req, res) => {res.send('Hello World!');});

const contactsRoutes = require('./contacts');

router.use('/contacts', contactsRoutes);
module.exports = router;