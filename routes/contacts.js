const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts'); 
const { isAuthenticated } = require('../middleware/authenticate');
const validateId = require('../helpers/ValidatorId');

router.get('/', contactsController.getAll);

router.get('/:id', validateId, contactsController.getSingle);

router.post('/', isAuthenticated, contactsController.createContact);

router.put('/:id',  validateId, isAuthenticated, contactsController.updateContact);

router.delete('/:id', validateId, isAuthenticated, contactsController.deleteContact);

module.exports = router;