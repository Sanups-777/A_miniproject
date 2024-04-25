
// const Image = require('./models/image'); // Import your Image model

// // Route to serve profile pictures
// router.get('', async (req, res) => {
//     try {
//         // Retrieve the profile picture data based on the profilePicId from the URL
//         const image = await Image.findById(req.params.profilePicId);

//         // If image is not found, return a 404 Not Found response
//         if (!image) {
//             return res.status(404).send('Profile picture not found');
//         }

//         // Set the appropriate content type based on the image's contentType field
//         res.set('Content-Type', image.contentType);

//         // Send the binary data of the image as the response
//         res.send(image.data);
//     } catch (error) {
//         // Handle any errors
//         console.error('Error retrieving profile picture:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
const express = require('express');
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const router = express.Router();

let db;
function init(dbConnection) {
  db = dbConnection;
  // console.log("connected succesfully")
}



//admin
const sdetailSchema = new mongoose.Schema({
    cname: String,
    adate: Date,
    edate: Date,
    position: String,
    sdate: Date

  });
  
  const Usersdata = mongoose.model('companies', sdetailSchema);
  
  router.get('/details', (req, res) => {
    Usersdata.find({})
      .then((data) => {
        res.render('drives', {
          userlist: data
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

  module.exports = { init, router };