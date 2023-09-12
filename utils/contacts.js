const fs = require("fs");

// make folder if folder not define
const dirFolder = "./data";
if (!fs.existsSync(dirFolder)) {
  fs.mkdirSync(dirFolder);
}

// make file contact.json
const dirPath = "./data/contact.json";
if (!fs.existsSync(dirPath)) {
  fs.writeFileSync(dirPath, "[]", "utf8");
}

// call all of Contact fron contact.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contact.json", "utf8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// search contact base on name
const findContact = (name) => {
  const contacts = loadContact();

  const oneContact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  return oneContact;
};

// Write  or Befall file contact.json  --> translate menyimpan data baru/menimpa data lama
const saveContact = (xs) => {
  fs.writeFileSync("data/contact.json", JSON.stringify(xs));
};

// Adding Contact
const addContact = (x) => {
  const contacts = loadContact();
  contacts.push(x);
  saveContact(contacts);
};

// Removing data Contact
const deleteContact = (name) => {
  const contacts = loadContact();

  const filteredContact = contacts.filter((contact) => contact.name !== name);

  saveContact(filteredContact);
};

// Updated data
const updatedContact = (x) => {
  const contacts = loadContact();

  const filteredContact = contacts.filter(
    (contact) => contact.name !== x.oldName
  );

  // console.info(filteredContact, x);
  delete x.oldName;
  filteredContact.push(x);
  saveContact(filteredContact);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  deleteContact,
  updatedContact,
};
