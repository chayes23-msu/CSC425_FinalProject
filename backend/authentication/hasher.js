import bcrypt from 'bcrypt';

// Hash the password before storing it
export async function hashPassword(password) {
    const saltRounds = 10;  // Adjust salt rounds as needed for security/performance balance
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Verify the password on login
export async function verifyPassword(inputPassword, storedHash) {
    return await bcrypt.compare(inputPassword, storedHash);
}
