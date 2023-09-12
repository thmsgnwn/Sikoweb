const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  homePage,
  aboutPage,
  contactsPage,
  formAddContact,
  processAddContact,
  processDeleteContact,
  formUpdateContact,
  processUpdatedContact,
  getDetailContact,
} = require("./controllers/contacts");

const { addStudent, loadStudent, findStudent } = require("./utils/students");

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // use ejs
app.use(expressLayouts); // Third-Party middleware
app.use(express.static("public")); // Built-in middleware
app.use(express.urlencoded()); // Built-in middleware

app.get("/", homePage); // Home Page

app.get("/about", aboutPage); // About Page

app.get("/contact", contactsPage); // contact Page
app.get("/student", (req, res) => {
  const students = loadStudent();

  res.render("student", {
    title: "Detail Page Students",
    layout: "layouts/main-layouts",
    students,
  });
});

app.get("/contact/add", formAddContact); // form page add data contact
app.get("/student/add", (req, res) => {
  res.render("add-student", {
    title: "Formt Add Data Student",
    layout: "layouts/main-layouts",
  });
}); // form page add data contact

// process add data Contact
app.post("/contact", processAddContact);
app.post("/student", (req, res) => {
  addStudent(req.body);
  res.redirect("/student");
});

// process delete contact => important to pick this before app.get("/contact/:name"
app.get("/contact/delete/:name", processDeleteContact);

// form page UPDATE data contact
app.get("/contact/edit/:name", formUpdateContact);

// procces Update Data
app.post("/contact/update", processUpdatedContact);

app.get("/contact/:name", getDetailContact); // detail contact page from name
app.get("/student/:id", (req, res) => {
  const student = findStudent(req.params.id);

  res.render("detail-student", {
    title: "Student Page",
    layout: "layouts/main-layouts",
    student,
  });
});

// API reference versi 4x, Seacth app.use()
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h2>404 : Page Not Found</h2>");
});

// calling port 3000 with localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
