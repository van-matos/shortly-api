import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import connection from "../dbStrategy/postgres.js";

export async function signUp (req, res) {
    const newUser = req.body;

    try {
        const encryptedPassword = hashSync(newUser.password, 10);

        await connection.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [newUser.name, newUser.email.toLowerCase(), encryptedPassword]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn (req, res) {
    const { userId } = res.locals;

    try {
        const token = jwt.sign({ userId: userId }, process.env.SECRET);

        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}