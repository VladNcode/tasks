const { readFile, writeFile } = require('node:fs');
const path = require('node:path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
	readFile(contactsPath, 'utf8', (err, data) => {
		if (err) console.error(err);

		console.log(data);
	});
}

function getContactById(contactId) {
	readFile(contactsPath, 'utf8', (err, data) => {
		if (err) console.error(err);

		const contacts = JSON.parse(data);
		const contact = contacts.find(({ id }) => id == contactId);

		console.log(contact);
	});
}

function removeContact(contactId) {
	readFile(contactsPath, 'utf8', (err, data) => {
		if (err) console.error(err);

		let contacts = JSON.parse(data);

		const contact = contacts.find(({ id }) => id == contactId);

		if (!contact) console.error('Contact with this Id not found!');
		else {
			contacts = contacts.filter(({ id }) => id != contactId);

			writeFile(contactsPath, JSON.stringify(contacts), err => {
				if (err) console.log(err);
				else console.log('Contact removed successfully!');
			});
		}
	});
}

function addContact(name, email, phone) {
	readFile(contactsPath, 'utf8', (err, data) => {
		if (err) console.error(err);

		const contacts = JSON.parse(data);
		const id = String(+contacts[contacts.length - 1].id + 1);

		contacts.push({ id, name, email, phone });

		writeFile(contactsPath, JSON.stringify(contacts), err => {
			if (err) console.log(err);
			else console.log('Contact added successfully!');
		});
	});
}

module.exports = { listContacts, getContactById, removeContact, addContact };
