const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: [true, 'Email field must be unique'],
        lowercase: [true, 'Email field must be lowercase']
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
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
        minlength: [8, 'Password must be greater than or equal to 8'],
        maxlength: [20, 'Password must be smaller than or equal to 20'],
        select: false
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    activate: {
        type: Boolean,
        default: true,
        select: false
    }
});

businessSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

businessSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

businessSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

businessSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

businessSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

businessSchema.pre(/^find/, function (next) {
    this.find({ activate: true });
    next();
});

module.exports = mongoose.model('Business', businessSchema);