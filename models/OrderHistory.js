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

orderHistorySchema.pre(/^find/, function (next) {
    this.find({ activate: true });
    next();
});

module.exports = mongoose.model('OrderHistory', orderHistorySchema);