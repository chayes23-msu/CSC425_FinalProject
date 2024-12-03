import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY

export function generateToken(user) {
    // Payload can include user data, like ID or role
    const payload = {
        user: user,
    };
    
    // Sign the token with the secret key and set an expiration time
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' }); // Token expires in 1 hour
}

//token authentication function
export function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}