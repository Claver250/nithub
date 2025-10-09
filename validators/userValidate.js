const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().pattern(/^[0-9]{10, 15}$/),
    password: joi.string().min(6).max(30).required(),
    address: joi.string().required(),
    dateOfBirth: joi.date().required(),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().email().required()
});

module.exports = {userSchema, loginSchema};