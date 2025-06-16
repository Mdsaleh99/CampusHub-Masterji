import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const validateApiKey = asyncHandler(async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        return next(new ApiError(403, "Missing Api key"));
    }

    const validApiKey = await db.apikey.findUnique({
        where: {
            key: apiKey,
        },
    });

    if (!validApiKey) {
        return next(new ApiError(403, "Invalid API key"));
    }

    console.log(validApiKey);
    

    req.apiUser = validApiKey.userId;
    next()
});
