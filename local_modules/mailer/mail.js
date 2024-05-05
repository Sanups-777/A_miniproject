const nodemailer = require("nodemailer");
const Mailgen =require("mailgen")

const mail = (req,res)=>{

    
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
            name:"god knows",
            intro:"lol",
            table:{
                data:[{
                    item:"chekc",
                    description:"mehh"
                }]
            }
        }}
    let mail=MailGenerator.generate(response);
    let message = {
        from: '16miniproject@gmail.com',
        to: 'athenabhuto@gmail.com',
        subject: subject,
        text: mail
    };
        // Send email
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });


};
module.exports= mail;




