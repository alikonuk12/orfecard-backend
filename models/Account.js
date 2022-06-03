const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: [true, 'Email field must be unique'],
        lowercase: [true, 'Email field must be lowercase']
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
        minlength: [8, 'Password must be greater than or equal to 8'],
        maxlength: [20, 'Password must be smaller than or equal to 20'],
        select: false
    },
    type: {
        type: String,
        required: [true, 'Type field is required'],
        enum: {
            values: ['Admin', 'Personal', 'Business'],
            message: 'This type cannot be given'
        }
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

accountSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, process.env.SALT);
    next();
});

accountSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

accountSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

accountSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(process.env.CRYPTO_GEN_RAND_NUM).toString('hex');
    this.passwordResetToken = crypto.createHash(process.env.CRYPTO_ALGORITHM_METHOD).update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

accountSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

accountSchema.pre(/^find/, function (next) {
    this.find({ activate: true });
    next();
});

module.exports = mongoose.model('Account', accountSchema);