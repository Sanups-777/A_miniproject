const express = require('express');
const router = express.Router();
const { companydata } = require("../models/models");
let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}



async function verification(password,res) {
  
      if (password === "password") 
      {
        console.log("welcome admin", password);
        let a = "Admin";
        res.render("ADMIN/adminp", {name: a});
      } 
      else 
      {
        console.log("INVALID PASSWORD");
        return res.redirect("/log");
      }
}

router.post('/user', async(req, res) => {
  const { uid:email, pass: password } = req.body;
  console.log("User login attempt:", email, password);
  if(email==='Admin@gmail.com')
  {
    verification(password,res)}
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
      let pp=result.profilePicUrl
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
  else{console.log("incorrect email");}

});



module.exports = { init, router };