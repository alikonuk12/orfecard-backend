const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const personalSchema = new mongoose.Schema({
    account: {
        type: ObjectId,
        ref: 'Account',
        required: [true, 'Account field is required'],
        unique: [true, 'Account field must be unique']
    },
    taxAdministration: {
        type: String,
        required: [true, 'Tax Administration field is required'],
    },
    TCKN: {
        type: Number,
        required: [true, 'TCKN field is required'],
        unique: [true, 'TCKN field must be unique']
    }
});

module.exports = mongoose.model('Personal', personalSchema);