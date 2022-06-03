const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
    serialNumber: {
        type: Number,
        required: [true, 'Serial Number field is required'],
        unique: [true, 'Serial Number field must be unique']
    },
    cardOwnerInfo: {
        type: ObjectId,
        ref: 'CardOwnerInfo',
        required: [true, 'Card Owner Info field is required'],
        unique: [true, 'Card Owner Info field must be unique']
    },
    type: {
        type: String,
        required: [true, 'Type field is required'],
        enum: {
            values: ['Black', 'Gray', 'White', 'Pink', 'Green', 'Special Design'],
            message: 'This type cannot be given'
        }
    },
    image: {
        type: String
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

cardSchema.pre(/^find/, function (next) {
    this.find({ activate: true });
    next();
});

module.exports = mongoose.model('Card', cardSchema);