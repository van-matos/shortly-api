import connection from "../dbStrategy/postgres.js";

export async function getUser (req, res) {
    const { userId } = res.locals.verifyToken;

    try {
        const { rows: dbUsers } = await connection.query(`
            SELECT 
                users.id as id,
                users.name as name,
                SUM(urls.views) as "visitCount",
                json_agg(json_build_object(
                    'id', urls.id,
                    'url', urls.url,
                    'views', urls.views
                )) AS "shortenedUrls"
            FROM users
            JOIN urls
            ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id
            `, [userId]
        );

        if (!dbUsers.length) {
            return res.sendStatus(404);
        }

        const response = {
            id: dbUsers[0].id,
            name: dbUsers[0].name,
            visitCount: dbUsers[0].visitCount,
            shortenedUrls: dbUsers[0].shortenedUrls
        };

        res.send(response).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}