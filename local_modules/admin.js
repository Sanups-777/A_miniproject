const express = require('express');
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const {companydata } = require('./models/models');


// router.get('/udetails', (req, res) => {
//   companydata.find({})
//     .then((data) => {
//       res.render('user_details', {
//         clist: data
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     });
// });

// router.post("/uremove", async (req, res) => {
  
//     var email = req.body.nrem;
//     var result;
//     try {
//     result = await companydata.findOne({ email: email }); // Use companydata model
//     } catch (err) {
//     console.log("User does not exist");
//     }
//     if (!result) {
//       console.log("User not found");
//   } else {
//       await companydata.deleteOne({ email: email });
//       console.log("User deleted");
//       res.redirect("/admin/details");
//   }

    
// });

router.get('/cdetails', (req, res) => {
  companydata.find({})
    .then((data) => {
      res.render('C_details', {
        clist: data
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.post("/delete", async (req, res) => {
  
    var email = req.body.nrem;
    var result;
    try {
    result = await companydata.findOne({ email: email }); // Use companydata model
    } catch (err) {
    console.log("User does not exist");
    }
    if (!result) {
      console.log("User not found");
  } else {
      await companydata.deleteOne({ email: email });
      console.log("User deleted");
      res.redirect("/admin/cdetails");
  }

    
});
router.post("/cdata", async (req, res) => {
  var name = req.body.cname;
  var p = req.body.position;
  var sd = new Date(req.body.sdate);
  var ed = new Date(req.body.edate);
  var ad = new Date(req.body.adate);

  try {
    const newData = await companydata.create({
      cname: name,
      position: p,
      sdate: sd,
      edate: ed,
      adate: ad,
    });

    console.log("Record Inserted Successfully:", newData._id);
    res.redirect("/admin/cdetails");
  } catch (err) {
    console.error("Error inserting record:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {  router };
