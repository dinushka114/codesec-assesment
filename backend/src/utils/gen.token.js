import jwt from 'jsonwebtoken';

const generateToken = (res , userId) => {

    const jwt_secret = process.env.JWT_SECRET;

    const token = jwt.sign({ userId }, jwt_secret, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export default generateToken;