import connection from "../dbStrategy/postgres.js";

export async function getUser (req, res) {
    const { userId } = res.locals.verifyToken;

    try {
        const { rows: dbUsers } = await connection.query(`
            SELECT 
                users.id as id,
                users.name as name,
                COALESCE(SUM(urls."views"), 0) as "visitCount",
                COALESCE(json_agg(json_build_object(
                    'id', urls.id,
                    'url', urls.url,
                    'views', urls.views
                ))
                FILTER (WHERE urls.id IS NOT NULL), '[]'::json)
                AS "shortenedUrls"
            FROM users
            LEFT JOIN urls
            ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id
            `, [userId]
        );

        if (!dbUsers.length) {
            return res.sendStatus(404);
        }

        res.send(dbUsers).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function rankUsers (req, res) {
    try {
        const { rows: dbUsers } = await connection.query(`
            SELECT 
                users.id as id,
                users.name as name,
                COUNT(urls."userId") as "linksCount",
                COALESCE(SUM(urls."views"), 0) as "visitCount"
            FROM users 
            LEFT JOIN urls
            ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `);

        res.send(dbUsers).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}