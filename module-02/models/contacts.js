const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
	return readFile(contactsPath, 'utf8');
}

async function getContactById(contactId) {
	const contacts = JSON.parse(await readFile(contactsPath, 'utf8'));
	const contact = contacts.find(({ id }) => id === contactId);

	return contact;
}

async function removeContact(contactId) {
	const contacts = JSON.parse(await readFile(contactsPath, 'utf8'));
	const contact = contacts.find(({ id }) => id === contactId);

	if (contact) {
		writeFile(contactsPath, JSON.stringify(contacts.filter(({ id }) => id !== contactId)));
	}

	return contact;
}

async function addContact(name, email, phone) {
	const contacts = JSON.parse(await readFile(contactsPath, 'utf8'));
	const id = String(+contacts[contacts.length - 1].id + 1);
	const contact = { id, name, email, phone };

	contacts.push(contact);

	writeFile(contactsPath, JSON.stringify(contacts));

	return contact;
}

async function updateContact(contactId, body) {
	const contacts = JSON.parse(await readFile(contactsPath, 'utf8'));
	const contact = contacts.find(({ id }) => id === contactId);
	if (!contact) return undefined;

	const updatedContact = { ...contact, ...body };
	const updatedContacts = contacts.map(cont => (cont.id === contactId ? updatedContact : cont));

	writeFile(contactsPath, JSON.stringify(updatedContacts));

	return updatedContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
