const express = require('express');
const router = express.Router();
const fs = require('fs');
const Image = require('./models/image'); // Import the Image model to interact with MongoDB

let db;

function init(dbConnection) {
    db = dbConnection;
    // console.log("connected successfully")
}

async function verification(email, password, res) {
    if (email === "admin") {
        if (password === "password") {
            console.log("Admin login successful");
            let a = "Admin";
            res.render("adminp", { name: a });
        } else {
            console.log("INVALID PASSWORD");
            return res.redirect("login.html");
        }
    } else {
        console.log("User authentication:", email, password);
    }
}

router.post('/user', async (req, res) => {
    const { uid: email, pass: password } = req.body;
    console.log("User login attempt:", email, password);
    if (email === 'Admin') {
        console.log("Welcome admin", email, password);
        verification(email, password, res);
    }
    try {
        var result = await db.collection("users").findOne({ email: email });
    } catch (err) {
        console.log("User does not exist");
    }
    console.log(result);
    if (result) {
        if (result.password == password) {
            let a = result.name;
            let e = result.email;
            let pp = result.profilePicUrl;
            res.render("userp", { name: a, email: e, profilep: pp });

            // Read and store the profile picture
            fs.readFile('/mini project/IMAGES/nan.jpg', (err, data) => {
                if (err) {
                    console.error('Error reading profile picture file:', err);
                    return;
                }

                // Save the profile picture to MongoDB
                const image = new Image({
                    data: data,
                    contentType: 'image/jpeg'
                });

                image.save((err, savedImage) => {
                    if (err) {
                        console.error('Error saving profile picture to MongoDB:', err);
                        return;
                    }
                    console.log('Profile picture saved to MongoDB:', savedImage);
                });
            });
        } else {
            console.log("Incorrect password");
        }
    } else {
        console.log("Incorrect email");
    }
});

module.exports = { router, init };
