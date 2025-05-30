const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts'); 
const { saveContact } = require('../middleware/validate');
const validateId = require('../helpers/ValidatorId');

router.get('/', contactsController.getAll);

router.get('/:id', validateId, contactsController.getSingle);

router.post('/', saveContact, contactsController.createContact);

router.put('/:id',  validateId, saveContact, contactsController.updateContact);

router.delete('/:id', validateId, contactsController.deleteContact);

module.exports = router;