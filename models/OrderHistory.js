const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderHistorySchema = new mongoose.Schema({
    account: {
        type: ObjectId,
        ref: 'Account',
        required: [true, 'Account field is required']
    },
    orderDetail: {
        type: [ObjectId],
        ref: 'OrderDetail'
    },
    price: {
        type: String,
        required: [true, 'Price field is required']
    },
    status: {
        type: String,
        required: [true, 'Status field is required'],
        enum: {
            values: ['İşleme alındı', 'Kargoya verildi'],
            message: 'This type cannot be given'
        },
        default: 'İşleme alındı'
    },
    createdAt: {
        type: Date,
        required: [true, 'Created At field is required'],
        default: Date.now()
    }
});

module.exports = mongoose.model('OrderHistory', orderHistorySchema);