const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const assistantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ism kiritilishi shart"],
        trim: true,
        minlength: [2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"]
    },
    phone: {
        type: String,
        required: [true, "Telefon raqam kiritilishi shart"],
        match: [/^\+998[0-9]{9}$/, "Noto'g'ri telefon raqam formati"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username kiritilishi shart"],
        unique: true,
        trim: true,
        minlength: [3, "Username kamida 3 ta belgidan iborat bo'lishi kerak"]
    },
    password: {
        type: String,
        required: [true, "Parol kiritilishi shart"],
        minlength: [6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"]
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: [true, "Do'kon kiritilishi shart"]
    },
    permissions: {
        type: Map,
        of: Boolean,
        default: {}
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: "Status 'active' yoki 'inactive' bo'lishi kerak"
        },
        default: 'active'
    },
    createdBy: {
        type: {
            role: {
                type: String,
                enum: ['admin', 'general', 'shop_owner'],
                required: true
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'createdBy.role'
            }
        },
        required: true
    }
}, {
    timestamps: true
});

// Parolni hashlash
assistantSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Parolni tekshirish metodi
assistantSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Password maydonini JSON ga o'tkazishda olib tashlash
assistantSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const Assistant = mongoose.model('Assistant', assistantSchema);

module.exports = Assistant;
