const {
  loadContact,
  addContact,
  findContact,
  deleteContact,
  updatedContact,
} = require("../utils/contacts");
const { loadStudent } = require("../utils/students");

const homePage = (req, res) => {
  const students = loadStudent();
  res.render("index", {
    name: "List of Students",
    title: "Home Page",
    layout: "layouts/main-layouts",
    students,
  });
};

const aboutPage = (req, res) => {
  res.render("about", {
    title: "AboutMe Page",
    layout: "layouts/main-layouts",
  });
};

const contactsPage = (req, res) => {
  const cs = loadContact(); // take many contacts

  res.render("contact", {
    title: "Detail Page Contact",
    layout: "layouts/main-layouts",
    cs,
  });
};

const formAddContact = (req, res) => {
  res.render("add-contact", {
    title: "Form Add Data Contact",
    layout: "layouts/main-layouts",
  });
};

const processAddContact = (req, res) => {
  addContact(req.body);
  res.redirect("/contact");
};

const processDeleteContact = (req, res) => {
  const contact = findContact(req.params.name); // take singular name from contact

  // condition if contact not found
  if (contact === undefined) {
    res.status(404);
    res.send("<h2>404</h2>");
  } else {
    deleteContact(req.params.name);
    // req.flash("msg", "Contact Already exist ");
    res.redirect("/contact");
  }
};

const formUpdateContact = (req, res) => {
  const contact = findContact(req.params.name);

  res.render("edit-contact", {
    title: "Form Update Data Contact",
    layout: "layouts/main-layouts",
    contact,
  });
};

const processUpdatedContact = (req, res) => {
  updatedContact(req.body);
  res.redirect("/contact");
};

const getDetailContact = (req, res) => {
  const contact = findContact(req.params.name); // take singular name from contact

  res.render("detail", {
    title: "Contact Page",
    layout: "layouts/main-layouts",
    contact,
  });
};

//   module export
module.exports = {
  homePage,
  aboutPage,
  contactsPage,
  formAddContact,
  processAddContact,
  processDeleteContact,
  formUpdateContact,
  processUpdatedContact,
  getDetailContact,
};
