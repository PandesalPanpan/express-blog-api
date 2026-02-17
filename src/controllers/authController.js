import { SECRET } from "../config.js";
import { prisma } from "../lib/prisma.js";
import authService from '../services/authService.js'
import jwt from "jsonwebtoken";
import { userRegisterValidation, validate } from "../validators/userValidator.js";
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

export const login = async (req, res, next) => {
    // Check the username and password if it exists or invalid
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json("Please enter a proper username & password.");
    }

    try {
        // check the username for matching username and password
        // See if the username exist in the database.
        const user = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username, mode: 'insensitive'
                }
            }
        })

        // If the username is not found, return an error
        if (!user) return res.status(400).json("Username is not found.");

        // use the authService that uses bcrypt compare
        const isMatch = await authService.verifyPassword(password, user.password);
        if (!isMatch) return res.status(400).json("You have entered the wrong password.");


        // If it matches, jwt sign the user
        // Destruct the safe info
        const { password: _pw, ...safeUser } = user;
        // TODO: Create a TODO that grabs the safe details from user prisma
        const token = jwt.sign(safeUser, SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Login Sucessful",
            token
        })
    } catch (err) {
        next(err);
    }
}