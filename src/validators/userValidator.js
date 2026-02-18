import { body, validationResult } from "express-validator";

export const userRegisterValidation = [
    body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email address."),
    body("username")
    .trim()
    .isLength({ min: 5, max: 16 }).withMessage("Username must be atleast 5 upto 16 characters."),
    body("password")
    .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    .withMessage("Password must atleast be 8 characters and include uppercase, lowercase and number."),
    body("confirmPassword")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password must match.");
        }
        return true;
    })    

]

export const userLoginValidation = [
    // email isemail and password not empty
    body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .bail()
    .withMessage("You have entered an invalid email address."),
    body("password")
    .notEmpty()
    .withMessage("You must type in your password.")
]

// This probably becomes like a validator middleware or an index validator file
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() })
}