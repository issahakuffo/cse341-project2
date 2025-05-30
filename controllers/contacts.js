 const mongodb = require('../data/database');
 const ObjectId = require('mongodb').ObjectId;
 
 // Get all users
 const getAll = async (req, res) => {
     try {
        const result = await mongodb.getDatabase().collection('contacts').find();
        const contacts =  await result.toArray();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ error: 'No Contacts found'});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
     } catch (err){
        res.status(500).json({ error: 'Failed to fetch contacts', details: err.message });
     }
 };
 

 const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactId });
    const contacts = await result.toArray();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: 'No Contacts found'});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch the contact',
      details: err.message
    });
  }
};
 
 const createContact = async (req,res) =>{
    //#swagger.tags = ['contacts']
     const contact = {
         frstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         favoriteColour: req.body.favoriteColour,
         birthday: req.body.birthday
     };
     const response = await mongodb.getDatabase().collection('contacts').inserteOne(contact);
     if (response.acknowledge){
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating the contact.')
     }
 };
 
 const updateContact = async (req,res) =>{
    //#swagger.tags = ['contacts']
     const contactId = new ObjectId(req.params.id);
     const contact = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         favoriteColour: req.body.favoriteColour,
         birthday: req.body.birthday
     };
     const response = await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);
     if (response.modifiedCount > 0){
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while updating the contact.')
     }
 };
 
 
 const deleteContact = async (req,res) =>{
    //#swagger.tags = ['contacts']
     const contactId = new ObjectId(req.params.id);
     const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
     if (response.deletedCount > 0){
         res.status(204).send();
     } else {
         res.status(500).json(response.error || 'Some error occured while deleting the contact.')
     }
 };
 
 module.exports = {
     getAll,
     getSingle,
     createContact,
     updateContact,
     deleteContact
 }; 