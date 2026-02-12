import bcrypt from 'bcryptjs'

const saltRounds = process.env.SALT_ROUNDS;

const hashPassword = async (plainPassword) => {
    // What are even rainbow stuff you mentioned?
    const salt = await bcrypt.genSalt(saltRounds);
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