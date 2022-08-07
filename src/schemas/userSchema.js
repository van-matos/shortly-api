import joi from "joi";

export const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required() 
})