const express = require('express');

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts.js');
const { contactValidationSchema } = require('./validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const contacts = await listContacts();

		res.status(200).json(contacts);
	} catch (error) {
		console.log(error);
	}
});

router.get('/:contactId', async (req, res, next) => {
	try {
		const contact = await getContactById(req.params.contactId);

		if (!contact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json(contact);
	} catch (error) {
		console.log(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		if (!name || !email || !phone) return res.status(400).json({ message: 'missing required name field' });

		const { error } = contactValidationSchema.validate(req.body);
		if (error) return res.status(400).json({ error: error.message });

		const contact = await addContact(name, email, phone);
		if (!contact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json(contact);
	} catch (error) {
		console.log(error);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const contact = await removeContact(req.params.contactId);
		if (!contact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json({ message: 'contact deleted' });
	} catch (error) {
		console.log(error);
	}
});

router.put('/:contactId', async (req, res, next) => {
	try {
		if (!Object.keys(req.body).length) return res.status(400).json({ message: 'missing fields' });

		const { error } = contactValidationSchema.validate(req.body);
		if (error) return res.status(400).json({ error: error.message });

		const contact = await updateContact(req.params.contactId, req.body);
		if (!contact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json(contact);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
