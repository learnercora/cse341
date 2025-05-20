const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: contactId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if(response.acknowledged) {
    res.status(201).send();
  }else{
    res.status(500).json(response.error || 'Some error occurred while creating the user')
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  }else{
    res.status(500).json(response.error || 'Some error occurred while updating the user')
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if(response.deletedCount > 0) {
    res.status(204).send();
  }else{
    res.status(500).json(response.error || 'Some error occurred while deleting the user')
  }
};


module.exports = { 
  getAll, 
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
