const {mailSender} = require ("../utils/mailer");

exports.contactUsHandler = async (req,res)=>{
    try{
        const {firstName, lastName, email, contactNo, message} = re.body;

        try{
            const userConfirmationREsponse = await mailSender(
                email,
                "Thank You For Contacting Us | Accio Learning",
                `Hey ${firstName}! We got your mail and will respond soon`);


            const adminResponse = await mailSender(
                "kamruddinkhandgp@gmail.com",
                `New Message From ${firstName} | Accio Learning `,
                `A user left a message! <br/> Name: ${firstName} ${lastName} <br/> Email: ${email} <br/> Ph No: ${contactNo} <br/> Message: ${message}`
            );

            return res.status(200)
            .json({
                success:true,
                message:"Email Recieved And Acknowledged",
                userConfirmationREsponse,
                adminResponse
            })
        }catch(err){

            return res.status(500)
            .json({
                success:false,
                message:"Issue In Sending Mail",
                err
            })

        }
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err
        })

    }
}