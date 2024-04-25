const express = require("express");
const nodemailer = require('nodemailer');
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
//  const admin = require("./local_modules/admin.js");
 const users = require("./local_modules/user.js");

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection;
    login.init(db); // Pass the MongoDB connection to login module
    // signup.init(db);
    //  admin.init(db);
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
// app.use('/admin', admin.router);
app.use('/users', users.router);

app.post('/send-email', (req, res) => {
  const { recipient, subject, message } = req.body;

  // Email options
  const mailOptions = {
      from: 'your_email@gmail.com',
      to: recipient,
      subject: subject,
      text: message
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
      } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Email sent successfully');
      }
  });
});
// Start the server
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

