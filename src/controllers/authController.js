import { SECRET } from "../config.js";
import { prisma } from "../lib/prisma.js";
import authService from '../services/authService.js'
import jwt from "jsonwebtoken";
import { userLoginValidation, userRegisterValidation, validate } from "../validators/userValidator.js";
// Create the action for register route
export const register = [
    userRegisterValidation,
    validate,
    async (req, res, next) => {
        const { email, username, password } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (existingUser) return res.status(409).json(
                { message: `The email ${email} already exists.` }
            );

            const hashedPassword = await authService.hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword
                }
            })

            const { password: _pw, ...safeUser } = user

            return res.status(201).json({ user: safeUser })
        } catch (error) {
            return next(error);
        }
    }
]

export const login = [
    userLoginValidation,
    validate,
    async (req, res, next) => {

        // Check if email and password exist
        const { email, password } = req.body;
        // Check if email matches in db
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                message: "Entered invalid details."
            })
        }

        try {
            // Grab the email using prisma
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(401).json({
                    message: "You have entered invalid credentials"
                });
            }

            // Check if hash matches with bcrypt
            const isMatch = await authService.verifyPassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "You have entered invalid credentials"
                });
            }


            // Grab the safe user data
            const { password: _password, ...safeUser } = user;
            jwt.sign(safeUser, SECRET, (err, token) => {
                if (err) {
                    return next(err);
                }

                return res.status(200).json({
                    token
                });
            })

        } catch (err) {
            next(err);
        }
    }
]