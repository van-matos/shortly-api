import { urlSchema } from "../schemas/urlSchema.js";

export async function validateUrl (req, res, next) {
    const url = req.body;

    const { error } = urlSchema.validate(url);

    if (error) {
        return res.sendStatus(422);
    }

    next();
}