import { db } from "../db/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"

export const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.validateBody;
    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return next(new ApiError(401, "User already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
    });

    if (!user) {
        return next(new ApiError(403, "User creation failed"));
    }

    return res
        .status(201)
        .json(new ApiResponse(201, user, "User signup successfully"));
});

export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.validateBody;

    const user = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return next(new ApiError(404, "User not exist"));
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ApiError(401, "Invalid Email or password"));
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    };

    const token = jwt.sign(
        // payload means data
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.status(201)
        .cookie("token", token, cookieOptions)
        .json(new ApiResponse(201, user, "Signin successfully"));
});

export const signout = asyncHandler(async (req, res) => {
    res.status(200)
        .clearCookie("token")
        .json(new ApiResponse(200, {}, "user signout successfully"));
});

export const getMe = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        omit: { // exclude the property
            // i have used omit because select and include can not use at a time, so i removed the select
            password: true
        },
        include: {
            apiKey: true
        }
    });
    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfullys")
    );
});

export const generateApiKey = asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const generateNewApiKey = crypto.randomBytes(32).toString("hex")

    const newApiKey = await db.apiKey.create({
        data: {
            userId,
            key: generateNewApiKey
        }
    })

    if (!newApiKey) {
        return next(new ApiError(403, "Api key genration failed"));
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newApiKey, "Api key generated successfully"));
})