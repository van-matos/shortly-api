import { compareSync } from "bcrypt";

import connection from "../dbStrategy/postgres.js";
import { loginSchema, registerSchema } from "../schemas/userSchema.js";

export async function validateSignup (req, res, next) {
    const newUser = req.body;

    const { error } = registerSchema.validate(newUser);

    if (error) {
        return res.sendStatus(422);
    }

    try {
        const { rows: verifyEmail } = await connection.query (
            `SELECT * FROM users WHERE email = $1`,
            [newUser.email.toLowerCase()]
        );

        if (verifyEmail.length > 0) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function validateLogin (req, res, next) {
    const userData = req.body;

    const { error } = loginSchema.validate(userData);

    if (error) {
        return res.sendStatus(422);
    }

    try {
        const { rows: dbUser } = await connection.query(
            `SELECT * FROM users WHERE email = $1`,
            [userData.email.toLowerCase()]
        );

        if (!dbUser.length || !compareSync(userData.password, dbUser[0].password)) {
            return res.sendStatus(401);
        }

        res.locals.userId = dbUser[0].id;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}