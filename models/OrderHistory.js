const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderHistorySchema = new mongoose.Schema({
    business: {
        type: ObjectId,
        ref: 'Business',
    },
    personal: {
        type: ObjectId,
        ref: 'Personal',
    },
    card: {
        type: ObjectId,
        ref: 'Card',
        required: [true, 'Card field is required'],
        unique: [true, 'Card field must be unique']
    },
    status: {
        type: String,
        required: [true, 'Status field is required'],
        enum: {
            values: ['Alındı', 'Yolda', 'Teslim Edildi'],
            message: 'This type cannot be given'
        },
        default: 'Alındı'
    },
    createdAt: {
        type: Date,
        required: [true, 'Created At field is required'],
        default: Date.now()
    }
});

module.exports = mongoose.model('OrderHistory', orderHistorySchema);