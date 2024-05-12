const nodemailer = require("nodemailer");
const Mailgen =require("mailgen")

const mail = (req,res)=>{
    const { userEmail, cEmail} = req.body;
    let transporter= nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '16miniproject@gmail.com',
            pass: 'engzmezkqcrsxyso'
        }
    });

    
    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
        
        }
        })
    let response={
        body:{
            name:userEmail,
            intro:"this student from this class has requested an application for this and this internship provided by this company",
            table:{
                data:[{
                    item:"ABC company",
                    description:"IEF"
                }]
            }
        }}
    let mail=MailGenerator.generate(response);
    let message = {
        from: 'athenabhuto@gmail.com',
        to: '16miniproject@gmail.com',
        subject: userEmail,
        html: mail
    };
        // Send email
    transporter.sendMail(message).then(() => {
        
            console.log('Email sent: ');
            res.status(200).send('Email sent successfully');
        }).catch(error=> {
                console.log(error);
                res.status(500).send('Error sending email');
        })
        
};
module.exports = { mail };




