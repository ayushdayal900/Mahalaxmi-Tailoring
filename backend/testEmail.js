const dotenv = require('dotenv');
const sendEmail = require('./utils/sendEmail');

// Load env vars
dotenv.config();

const testEmail = async () => {
    console.log('Attempting to send test email...');
    console.log(`From: ${process.env.SES_FROM_NAME} <${process.env.SES_FROM_EMAIL}>`);
    console.log(`To: ${process.env.CONTACT_EMAIL}`);

    try {
        await sendEmail({
            email: process.env.CONTACT_EMAIL, // Send to yourself
            subject: 'Test Email from Mahalaxmi Tailors (AWS SES)',
            message: 'If you are reading this, your AWS SES integration is working correctly!',
            html: '<h1>Success!</h1><p>Your AWS SES email integration is <strong>working correctly</strong>.</p>'
        });
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('Failed to send test email:', error);
        if (error.code === 'MessageRejected') {
            console.error('Reason: Email address is not verified (Sandbox mode) or Domain settings are incorrect.');
        }
    }
};

testEmail();
