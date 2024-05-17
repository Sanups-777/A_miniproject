const mongoose = require("mongoose");


const cdetailSchema = new mongoose.Schema({
    cname: String,
    adate: Date,
    edate: Date,
    position: String,
    sdate: Date

  });
  
  const companydata = mongoose.model('companies', cdetailSchema);
  
  const adetailSchema = new mongoose.Schema({
    email: String,
    password:String,
  });
  
  const admindata = mongoose.model('admin', adetailSchema);
  
  
  module.exports={companydata,admindata};