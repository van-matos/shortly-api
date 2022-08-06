import bcrypt from "bcrypt";

import connection from "../dbStrategy/postgres.js";

export async function signUp (req, res) {
    const newUser = req.body;

    try {
        const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

        await connection.query(`
            INSERT INTO "users" (name, email, password)
            VALUES ($1, $2, $3)
        `, [newUser.name, newUser.email.toLowerCase(), encryptedPassword]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}