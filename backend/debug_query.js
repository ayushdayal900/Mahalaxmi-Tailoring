const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mahalxmi_tailors';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected');
        try {
            const products = await Product.find({}).populate('category');
            console.log('Got products:', products.length);
            if (products.length > 0) {
                console.log('Sample product category:', products[0].category);
            }
        } catch (e) {
            console.error('❌ Error:', e);
        }
        process.exit();
    })
    .catch(e => console.error(e));
