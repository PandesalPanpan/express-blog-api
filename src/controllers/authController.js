import { prisma } from "../lib/prisma.js";
import authService from '../services/authService.js'
// Create the action for register route
export const register = async (req, res, next) => {
    // TODO: Verifications and Errors

    // Grab the req.body
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({
            message: "You have sent lacking username or password."
        });
    }

    const usernameTrim = username.trim();
    const normalizedUsername = usernameTrim.toLowerCase();


    try {
        // Check if username exist through prisma
        const existingUser = await prisma.user.findFirst({
            where: {
                username: {
                    equals: normalizedUsername, mode: 'insensitive'
                }
            }
        });

        if (existingUser) return res.status(409).json(
            { message: `The username ${username} already exists.`}
        );

        const hashedPassword = await authService.hashPassword(password);

        const user = await prisma.user.create({
            data: {
                username: usernameTrim,
                password: hashedPassword
            }
        })

        const { password: _pw, ...safeUser } = user
        return res.status(201).json({ user: safeUser })
    } catch (error) {
        return next(error);
    }
}

export const test = (req, res) => {
    res.json({ message: "test route" })
}