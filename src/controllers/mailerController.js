import sgMail from '@sendgrid/mail';
import asyncHandler from 'express-async-handler';


export const sendMail = asyncHandler(async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { name, email, services, budget, message } = req.body;

    if (!name || typeof name !== 'string') {
        throw new Error('Name was not defined');
    }
    if (!email || typeof email !== 'string') {
        throw new Error('Email was not defined');
    }
    if (!message || typeof message !== 'string') {
        throw new Error('Message was not defined');
    }

    const msg = {
        to: process.env.EMAIL_TO, // Your recipient
        from: process.env.FROM_EMAIL, // Verified Sendgrid sender
        subject: 'Email sent with SendGrid from portfolio',
        text: `Hey, i'm ${name}, this is my email: ${email}, 
            and wanna leave you a message: ${message}.
            If i decide to hire you, this are some services that i need an the budget to make it done
            Services: ${services}.
            Budget: ${budget}`,
        html: `<div>
            Hey, i'm <strong>${name}</strong>,<br>
            this is my email: <strong>${email}</strong>,<br> 
            and wanna leave you a message: <i>${message}</i><br>
            If i decide to hire you, this are some services that i need an the budget to make it done <br>
            <strong>Services:</strong> <i>${services}</i>.<br>
            <strong>Budget:</strong> <i>${budget}</i>
            </div>`,
    };

    try {
        await sgMail.send(msg)
        res.json({
            success: 'ok',
            message: 'Email sent'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something is wrong:',
            error: error.message
        });
    }
});