const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const businessSchema = new mongoose.Schema({
    account: {
        type: ObjectId,
        ref: 'Account',
        required: [true, 'Account field is required'],
        unique: [true, 'Account field must be unique']
    },
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number field is required'],
        unique: [true, 'Phone Number field must be unique']
    },
    landlineNumber: {
        type: String,
        required: [true, 'Landline Number field is required'],
        unique: [true, 'Landline Number field must be unique']
    },
    extNumber: {
        type: String,
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address field is required'],
    },
    taxAdministration: {
        type: String,
        required: [true, 'Tax Administration field is required'],
    },
    taxNumber: {
        type: String,
        required: [true, 'Tax Administration field is required'],
    }
});

module.exports = mongoose.model('Business', businessSchema);