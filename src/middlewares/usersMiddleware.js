import connection from "../dbStrategy/postgres.js";
import { registerSchema } from "../schemas/userSchemas.js";

export async function validateSignup (req, res, next) {
    const newUser = req.body;

    const { error } = registerSchema.validate(newUser);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const { rows: verifyEmail } = await connection.query (
            `SELECT * FROM users WHERE email = $1`,
            [newUser.email.toLowerCase()]
        )

        if (verifyEmail.length > 0) {
            return res.status(409).send('Este email já está cadastrado!');
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}