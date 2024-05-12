const mongoose = require("mongoose");


const cdetailSchema = new mongoose.Schema({
    cname: String,
    adate: Date,
    edate: Date,
    position: String,
    sdate: Date

  });
  
  const companydata = mongoose.model('companies', cdetailSchema);
  
  module.exports={companydata};