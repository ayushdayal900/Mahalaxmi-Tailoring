const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mahalxmi_tailors';
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const adminEmail = 'admin@example.com';
        const adminPassword = 'password123';

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('⚠️ Admin user already exists.');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });

        console.log('🎉 Admin User Created Successfully!');
        console.log('-----------------------------------');
        console.log(`Email:    ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log('-----------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
