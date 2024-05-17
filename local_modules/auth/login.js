const express = require('express');
const router = express.Router();
const { companydata, admindata } = require("../models/models");
let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}



async function admin(email, password, res) {
  const admin=await admindata.findOne({email})
  console.log("verification");
      if (admin.password === password) {
        let a = "Admin";
        res.render("ADMIN/adminp", {name: a});
      } 
      else 
      {
        console.log("INVALID PASSWORD");
        return res.redirect("/log");
      }
}
async function student(email, password, res) {
  try {
    var result = await db.collection("users").findOne({ email: email });
  } catch (err) {
    console.log("User does not exist");
  }
  console.log(result)
  if(result){
    if (result.password == password) {
      let a = result.name;
      let e = result.email;
    companydata.find({})
    .then((data) => {
      res.render("userp", {
        clist: data,name:a,email:e,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
    }
    else{console.log("incorrect password");}
  }
  else{console.log("incorrect email");}}

router.post('/user', async(req, res) => {
  const { uid:email, pass: password } = req.body;
  console.log("User login attempt:", email, password);
  const [localPart, domainPart] = email.split('@');
    console.log("check", localPart, domainPart);
// Check if the local part contains 'admin'
    if (localPart.includes('admin'))
  {console.log("Welcome admin", email, password);
    admin(email,password,res)
 }else{
  console.log("Welcome user", email, password);
  student(email, password, res);
}

});



module.exports = { init, router };