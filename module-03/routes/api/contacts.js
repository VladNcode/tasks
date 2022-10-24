const express = require('express');
const { Contact } = require('../../models/contacts.model');

const { contactValidationSchema } = require('./validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const contacts = await Contact.find();

		res.status(200).json(contacts);
	} catch (error) {
		console.log(error);
	}
});

router.get('/:contactId', async (req, res, next) => {
	try {
		const contact = await Contact.findById(req.params.contactId);

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

		const contact = await Contact.create({ name, email, phone });

		res.status(200).json(contact);
	} catch (error) {
		console.log(error);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	try {
		const contact = await Contact.findByIdAndDelete(req.params.contactId);
		if (!contact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json({ message: 'contact deleted' });
	} catch (error) {
		console.log(error);
	}
});

router.patch('/:contactId/favorite', async (req, res, next) => {
	try {
		if (req.body.favorite === undefined) return res.status(400).json({ message: 'missing field favorite' });

		const updateStatusContact = async (contactId, body) => {
			return Contact.findByIdAndUpdate(contactId, body, { new: true });
		};

		const updatedContact = await updateStatusContact(req.params.contactId, req.body);
		if (!updatedContact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json(updatedContact);
	} catch (error) {
		console.log(error);
	}
});

router.put('/:contactId', async (req, res, next) => {
	try {
		if (!Object.keys(req.body).length) return res.status(400).json({ message: 'missing fields' });

		const { error } = contactValidationSchema.validate(req.body);
		if (error) return res.status(400).json({ error: error.message });

		const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
		if (!contact) return res.status(404).json({ message: 'Not found' });

		res.status(200).json(contact);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
