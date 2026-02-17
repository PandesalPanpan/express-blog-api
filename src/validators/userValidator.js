import { body, validationResult } from "express-validator";

export const userRegisterValidation = [
    body("email").isEmail().withMessage("Enter a valid email address."), ,
    body("username").isLength({ min: 5, max: 16 }).withMessage("Username must be atleast 5 upto 16 characters."),
    body("password").isLength({ min: 8, max: 32 }).withMessage("Password must be atleast 8 upto 32 characters.")
]

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty) {
        next();
    }
    return res.status(400).json({ errors: errors.array() })
}