const Contact = require('../models/Contact');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        // Send Email to Admin/Support
        try {
            await sendEmail({
                email: process.env.CONTACT_EMAIL || process.env.SES_FROM_EMAIL, // Send TO business owner
                subject: `New Contact Inquiry from ${name}`,
                message: `You have received a new message from ${name} (${email}, ${phone}):\n\n${message}`,
                html: `<h3>New Contact Inquiry</h3>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Phone:</strong> ${phone}</p>
                       <p><strong>Message:</strong><br/>${message}</p>`
            });
        } catch (emailError) {
            console.error('Contact email failed:', emailError);
        }

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
