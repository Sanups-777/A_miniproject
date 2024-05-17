const express = require('express');
const router = express.Router();
// Import the Image model to interact with MongoDB
const { admindata } = require('../models/models');
let db;

function init(dbConnection) {
    db = dbConnection;
    // console.log("connected successfully")
}

async function admin(email, password, res) {
    const admin=await admindata.findOne({email})
    console.log("verification");
        if (admin.password === password) {
            console.log("Admin login successful");
            let a = "Admin";
            res.render("adminp", { name: a });
        } else {
            console.log("INVALID PASSWORD");
            return res.redirect("login.html");
        }
}
async function student(email, password, res) {
    try {
        var result = await db.collection("users").findOne({ email: email });
        if (result.password == password) {
            let a = result.name;
            let e = result.email;
            
            res.render("userp", { name: a, email: e });

        } else {
            console.log("Incorrect password");
        }
    } catch (err) {
        console.log("User does not exist");
    } 
}
router.post('/user', async (req, res) => {
    const { uid: email, pass: password } = req.body;
    console.log(" login attempt:", email, password);
    const [localPart, domainPart] = email.split('@');
    console.log("check", localPart, domainPart);
// Check if the local part contains 'admin'
    if (localPart.includes('admin')) {
        console.log("Welcome admin", email, password);
        return verification(email, password, res);
    }

    else{
        console.log("Welcome admin", email, password);
        student(email, password, res);
    }
    
});

module.exports = { router, init };
