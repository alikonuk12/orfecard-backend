const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderDetailSchema = new mongoose.Schema({
    card: {
        type: ObjectId,
        ref: 'Card'
    },
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    fullname: {
        type: String
    },
    logo: {
        type: String
    },
    specialDesign: {
        type: String
    },
    color: {
        type: String
    },
    direction: {
        type: String
    },
    createdAt: {
        type: Date,
        required: [true, 'Created At field is required'],
        default: Date.now()
    }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);