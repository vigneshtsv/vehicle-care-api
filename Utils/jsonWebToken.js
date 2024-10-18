import jwt from 'jsonwebtoken';


//Generate Token by User Id
export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '48h',
    });
    return token;
};

//Verify Token and Return User Id
export const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    return decodedToken.userId;
};
