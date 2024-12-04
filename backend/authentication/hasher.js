import bcrypt from 'bcrypt';

/**
 * Hash the password before storing it
 * @param {string} password password to be hashed
 * @returns {string} hashed password (if falsy password is passed in, returns null)
 */
export async function hashPassword(password) {
    if(!password) {
        return null;
    }
    const saltRounds = 10;  // Adjust salt rounds as needed for security/performance balance
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Verify the password on login
export async function verifyPassword(inputPassword, storedHash) {
    return await bcrypt.compare(inputPassword, storedHash);
}
