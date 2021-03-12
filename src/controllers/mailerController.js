import asyncHandler from 'express-async-handler';
import transporter from '../config/smtpTransport.js';

const sendMail = asyncHandler(async (req, res) => {
    try {
        const { fromName, toEmail, subject, textBody, htmlBody } = req.body;

        if (!subject || typeof subject !== 'string') {
            throw new Error('Subject was not defined');
        }
        if (!toEmail || typeof toEmail !== 'string') {
            throw new Error('To Email was not defined');
        }

        const mailOptions = {
            from: fromName + ' <' + process.env.FROM_EMAIL + '>',
            to: toEmail,
            subject: subject,
            text: textBody,
            html: htmlBody
        };
        // console.log(mailOptions)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error.message);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.json({
                message: 'Message sent successfully!'
            })
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: 'Something is wrong:',
            error: error.message
        })
        console.error('Something is wrong:')
        console.error(error.message)
    }
});

export { sendMail };