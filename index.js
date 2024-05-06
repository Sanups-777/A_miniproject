const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

// Set the view engine to use EJS
app.set("view engine", "ejs");

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("PUBLIC"));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "images" directory under "/images" path
app.use("/IMAGES", express.static("IMAGES"));

//Import local modules
const login = require("./local_modules/login.js");
// const signup = require("./local_modules/signup.js");
 const users = require("./local_modules/user.js");

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://u2104014:Athens_Mdb@cluster0.mermwy1.mongodb.net/miniproject', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection;
    login.init(db); // Pass the MongoDB connection to login module
    // signup.init(db);
    //admin.init(db);
    users.init(db);
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/PUBLIC/index.html");
});
app.get("/internt", (req, res) => {
  res.sendFile(__dirname + "/PUBLIC/internteam.html");
});
app.get("/log", (req, res) => {
  res.sendFile(__dirname + "/PUBLIC/login.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/PUBLIC/contactus.html");
});


// // Mount routes
app.use('/login', login.router);
// app.use('/reg', signup.router);
app.use('/users', users.router);

// Create a Nodemailer transporter

// Define your route to render the EJS template
app.get('/', (req, res) => {
  res.render('index');
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

