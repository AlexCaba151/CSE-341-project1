const database = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = database.getDatabase();
    const contacts = await db.db('contactsDB').collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};

const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const db = database.getDatabase();
    const contact = await db.db('contactsDB').collection('contacts').findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching contact' });
  }
};

const createUser = async (req, res) => {
  try {
    const db = database.getDatabase();

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.db('contactsDB').collection('contacts').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ message: 'User created successfully', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error inserting user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const db = database.getDatabase();
    const userId = new ObjectId(req.params.id);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.db('contactsDB').collection('contacts').replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = database.getDatabase();
    const userId = new ObjectId(req.params.id);

    const response = await db.db('contactsDB').collection('contacts').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
