const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact by id
router.get('/:id', contactsController.getSingle);

// POST create a new contact
router.post('/', contactsController.createUser);

// PUT update a contact
router.put('/:id', contactsController.updateUser);

// DELETE a contact
router.delete('/:id', contactsController.deleteUser);

module.exports = router;
