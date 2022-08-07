import connection from "../dbStrategy/postgres.js";
import { urlSchema } from "../schemas/urlSchema.js";

export async function validateUrl (req, res, next) {
    const url = req.body;

    const { error } = urlSchema.validate(url);

    if (error) {
        return res.sendStatus(422);
    }

    next();
}

export async function validateUrlUser (req, res, next) {
    const id = parseInt(req.params.id);
    const { userId } = res.locals.verifyToken;

    try {
        const { rows: dbUrl } = await connection.query(`
            SELECT *
            FROM "urls"
            WHERE "id" = $1
            `, [id]
        );

        if (!dbUrl.length) {
            return res.sendStatus(404);
        }

        if (dbUrl[0].userId !== userId) {
            return res.sendStatus(401);
        }

        next()
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}