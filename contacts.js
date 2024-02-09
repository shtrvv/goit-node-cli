const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((item) => item.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId);
  const removedContact = contacts[index];

  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
