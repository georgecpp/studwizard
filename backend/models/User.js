const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        default: null
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
        default: null
    },
    img: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: String
    },
    role: {
        type: Number,
        required: true
    }
});

const meditatorSchema = new Schema({
    ...userSchema.obj,
    phoneNumber: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        default: "No profile description added."
    },
    educationHistory: {
        lastInstitution: String,
        teachPlacePreference: String
    },
    experience: {
        expYears: Number,
        numberOfMeditations: Number,
        score: Number
    }
});

module.exports.User = model('User', userSchema);
module.exports.Meditator = model('Meditator', meditatorSchema);