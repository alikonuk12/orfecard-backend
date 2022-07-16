const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cardOwnerInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname field is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number field is required'],
        unique: [true, 'Phone Number field must be unique']
    },
    landlineNumber: {
        type: String
    },
    extNumber: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: [true, 'Email field must be unique'],
        lowercase: [true, 'Email field must be lowercase']
    },
    business: {
        type: ObjectId,
        ref: 'Business',
    },
    personal: {
        type: ObjectId,
        ref: 'Personal',
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
    companyName: {
        type: String
    },
    image: {
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
    activate: {
        type: Boolean,
        default: true,
        select: false
    }
});

cardOwnerInfoSchema.pre(/^find/, function (next) {
    this.find({ activate: true });
    next();
});

module.exports = mongoose.model('CardOwnerInfo', cardOwnerInfoSchema);