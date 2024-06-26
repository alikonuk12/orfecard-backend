const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    landlineNumber: {
        type: String
    },
    extNumber: {
        type: String,
    },
    email: {
        type: String,
        lowercase: [true, 'Email field must be lowercase']
    },
    account: {
        type: ObjectId,
        required: [true, 'Account field is required'],
        ref: 'Account',
    },
    website: {
        type: String
    },
    address: {
        type: String,
    },
    location: {
        type: String
    },
    tax_information: {
        type: String
    },
    bank_information: {
        type: String
    },
    e_catalog_1: {
        type: String
    },
    e_catalog_2: {
        type: String
    },
    e_catalog_3: {
        type: String
    },
    e_catalog_4: {
        type: String
    },
    e_catalog_5: {
        type: String
    },
    companyName: {
        type: String
    },
    image: {
        type: String
    },
    serialNumber: {
        type: Number,
        required: [true, 'Serial Number field is required'],
        unique: [true, 'Serial Number field must be unique']
    },
    cardType: {
        type: String,
        enum: {
            values: ['Vertical', 'Horizontal'],
            message: 'This type cannot be given'
        }
    },
    cardColor: {
        type: String,
        required: [true, 'Type field is required']
    },
    cardImage: {
        type: String
    },
    specialDesign: {
        type: String
    },
    facebook: {
        type: String,
        lowercase: [true, 'Facebook field must be lowercase']
    },
    twitter: {
        type: String,
        lowercase: [true, 'Twitter field must be lowercase']
    },
    instagram: {
        type: String,
        lowercase: [true, 'Instagram field must be lowercase']
    },
    linkedIn: {
        type: String,
        lowercase: [true, 'LinkedIn field must be lowercase']
    },
    youtube: {
        type: String,
        lowercase: [true, 'Youtube field must be lowercase']
    },
    sahibinden: {
        type: String,
        lowercase: [true, 'Sahibinden field must be lowercase']
    },
    shopier: {
        type: String,
        lowercase: [true, 'Shopier field must be lowercase']
    },
    yemeksepeti: {
        type: String,
        lowercase: [true, 'Yemeksepeti field must be lowercase']
    },
    trendyol: {
        type: String,
        lowercase: [true, 'Trendyol field must be lowercase']
    },
    trendyolYemek: {
        type: String,
        lowercase: [true, 'Trendyol Yemek field must be lowercase']
    },
    amazon: {
        type: String,
        lowercase: [true, 'Amazon field must be lowercase']
    },
    n11: {
        type: String,
        lowercase: [true, 'N11 field must be lowercase']
    },
    cicekSepeti: {
        type: String,
        lowercase: [true, 'Çiçek Sepeti field must be lowercase']
    },
    getir: {
        type: String,
        lowercase: [true, 'Getir field must be lowercase']
    },
    etsTur: {
        type: String,
        lowercase: [true, 'Ets Tur field must be lowercase']
    },
    hepsiburada: {
        type: String,
        lowercase: [true, 'Hepsiburada field must be lowercase']
    },
    letgo: {
        type: String,
        lowercase: [true, 'Letgo field must be lowercase']
    },
    pinterest: {
        type: String,
        lowercase: [true, 'Pinterest field must be lowercase']
    },
    grupanya: {
        type: String,
        lowercase: [true, 'Grupanya field must be lowercase']
    },
    createdAt: {
        type: Date,
        required: [true, 'Created At field is required'],
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: [true, 'Created At field is required'],
        default: Date.now()
    },
    activate: {
        type: Boolean,
        default: true,
        select: false
    }
});

cardSchema.pre(/^find/, function (next) {
    this.find({ activate: true });
    next();
});

module.exports = mongoose.model('Card', cardSchema);