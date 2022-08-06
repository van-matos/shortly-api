import jwt from "jsonwebtoken";

export async function validateToken (req, res, next) {
    const token = req.headers.authorization;

    try {
        const verifyToken = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);

        res.locals.verifyToken = verifyToken;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}