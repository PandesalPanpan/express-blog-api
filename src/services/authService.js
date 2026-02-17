import bcrypt from 'bcryptjs'
import { SALT_ROUNDS } from '../config.js';

const hashPassword = async (plainPassword) => {
    // What are even rainbow stuff you mentioned?
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(plainPassword, salt);
    return hashed; 
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

export default {
    hashPassword,
    verifyPassword
}