const fs = require("fs");

// make folder if folder not define
const dirFolder = "./data";
if (!fs.existsSync(dirFolder)) {
  fs.mkdirSync(dirFolder);
}

// make file contact.json
const dirPath = "./data/students.json";
if (!fs.existsSync(dirPath)) {
  fs.writeFileSync(dirPath, "[]", "utf8");
}

// call all of Contact fron contact.json
const loadStudent = () => {
  const fileBuffer = fs.readFileSync("data/students.json", "utf8");
  const row = JSON.parse(fileBuffer);
  return row;
};

// search contact base on name
const findStudent = (id) => {
  const students = loadStudent();

  const oneStudent = students.find((x) => x.id === id);
  return oneStudent;
};

// Write  or Befall file contact.json  --> translate menyimpan data baru/menimpa data lama
const saveStudent = (xs) => {
  fs.writeFileSync("data/students.json", JSON.stringify(xs));
};

// Adding Contact
const addStudent = (x) => {
  const s = loadStudent();
  s.push(x);
  saveStudent(s);
};

// Removing data Contact
const deleteStudent = (name) => {
  const s = loadStudent();

  const filteredStudent = s.filter((x) => x.name !== name);

  saveStudent(filteredStudent);
};

// Updated data
const updateStudent = (x) => {
  const s = loadStudent();

  const filteredStudent = s.filter((x) => x.name !== x.oldName);

  // console.info(filteredContact, x);
  delete x.oldName;
  filteredStudent.push(x);
  saveStudent(filteredStudent);
};

module.exports = {
  loadStudent,
  findStudent,
  addStudent,
  deleteStudent,
  updateStudent,
};
