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
        type: String,
        unique: [true, 'Landline Number field must be unique']
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
        unique: [true, 'Facebook field must be unique'],
        lowercase: [true, 'Facebook field must be lowercase']
    },
    twitter: {
        type: String,
        unique: [true, 'Twitter field must be unique'],
        lowercase: [true, 'Twitter field must be lowercase']
    },
    instagram: {
        type: String,
        unique: [true, 'Instagram field must be unique'],
        lowercase: [true, 'Instagram field must be lowercase']
    },
    linkedIn: {
        type: String,
        unique: [true, 'LinkedIn field must be unique'],
        lowercase: [true, 'LinkedIn field must be lowercase']
    },
    youtube: {
        type: String,
        unique: [true, 'Youtube field must be unique'],
        lowercase: [true, 'Youtube field must be lowercase']
    },
    sahibinden: {
        type: String,
        unique: [true, 'Sahibinden field must be unique'],
        lowercase: [true, 'Sahibinden field must be lowercase']
    },
    shopier: {
        type: String,
        unique: [true, 'Shopier field must be unique'],
        lowercase: [true, 'Shopier field must be lowercase']
    },
    yemeksepeti: {
        type: String,
        unique: [true, 'Yemeksepeti field must be unique'],
        lowercase: [true, 'Yemeksepeti field must be lowercase']
    },
    trendyol: {
        type: String,
        unique: [true, 'Trendyol field must be unique'],
        lowercase: [true, 'Trendyol field must be lowercase']
    },
    gittigidiyor: {
        type: String,
        unique: [true, 'Gittigidiyor field must be unique'],
        lowercase: [true, 'Gittigidiyor field must be lowercase']
    },
    amazon: {
        type: String,
        unique: [true, 'Amazon field must be unique'],
        lowercase: [true, 'Amazon field must be lowercase']
    },
    n11: {
        type: String,
        unique: [true, 'N11 field must be unique'],
        lowercase: [true, 'N11 field must be lowercase']
    },
    cicekSepeti: {
        type: String,
        unique: [true, 'Çiçek Sepeti field must be unique'],
        lowercase: [true, 'Çiçek Sepeti field must be lowercase']
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