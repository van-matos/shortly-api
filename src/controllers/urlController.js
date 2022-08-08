import { nanoid } from "nanoid";

import connection from "../dbStrategy/postgres.js";

export async function shortenUrl (req, res) {
    const { url } = req.body;
    const { userId } = res.locals.verifyToken;
    
    const shortUrl = nanoid(8);

    try {
        await connection.query(`
            INSERT INTO urls (url, "shortUrl", "userId", views)
            VALUES ($1, $2, $3, $4)
            `, [url, shortUrl, userId, 0]
        );

        res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrl (req, res) {
    const id = parseInt(req.params.id);

    try {
        const { rows: dbUrl } = await connection.query(`
            SELECT id, url, "shortUrl"
            FROM "urls"
            WHERE id = $1
            `, [id]
        );

        if (!dbUrl.length) {
            res.sendStatus(404);
        }

        res.status(200).send(dbUrl[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function openUrl (req, res) {
    const shortUrl = req.params.shortUrl;

    try {
        const { rows: dbUrl } = await connection.query(`
            SELECT *
            FROM urls
            WHERE "shortUrl" = $1
            `, [shortUrl]
        );

        if (!dbUrl.length) {
            return res.sendStatus(404);
        }

        await connection.query(`
            UPDATE urls
            SET views = views + 1
            WHERE id = $1
        `, [dbUrl[0].id]);

        return res.redirect(dbUrl[0].url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteUrl (req, res) {
    const id = parseInt(req.params.id);

    try {
        await connection.query(`
            DELETE FROM urls
            WHERE id = $1
            `, [id]
        );

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}