const express = require('express');
const router = express.Router();

let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}



async function verification(email,password,res) {
  if (email == "admin") 
    {
      if (password === "password") 
      {
        console.log(verify);
        let a = "Admin";
        res.render("adminp", {name: a});
      } 
      else 
      {
        console.log("INVALID PASSWORD");
        return res.redirect("login.html");
      }
    }
  else{console.log("autentication",email,password)}
}

router.post('/user', async(req, res) => {
  const { uid:email, pass: password } = req.body;
  console.log("User login attempt:", email, password);
  if(email==='Admin')
  {console.log("welcome admin", email, password);
    verification(email,password,res)}
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
      res.render("userp", {name: a, email: e,profilep:pp});
    }
    else{console.log("incorrect password");}
  }
  else{console.log("incorrect email");}

});



module.exports = { init, router };