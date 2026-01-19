import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { AppError } from "@/lib/appError";
import { catchAsync } from "@/lib/catchAsync";
import { NextResponse } from "next/server";

/* ================= TOKEN ================= */

const signToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};

const createSendToken = async (user, statusCode) => {
    const token = signToken(user);

    const response = NextResponse.json(
        {
            status: "success",
            data: { user, token },
        },
        { status: statusCode }
    );

    //Remove Password from output
    user.password = undefined;
    user.passwordConfirm = undefined;

    response.cookies.set("token", token, {
        httpOnly: true,
        // Set 'secure' flag in production or if the request is secure
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
        ),
    });

    return response
};

export const signup = catchAsync(async (req) => {
    await connectDB();

    const body = await req.json();

    const user = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        password_confirm: body.password_confirm,
    });

    return createSendToken(user, 201)
});


export const login = catchAsync(async (req) => {
    await connectDB();

    //1) Get POSTed email and password
    const body = await req.json()
    const { email, password } = body;

    // 2) Check if there is email and password
    if (!email || !password) {
        throw new AppError('Please provide email and password', '', 401)
    }

    // 3) Check if user exist and passord is correct
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError("Password or email is incorrect", '', 401);
    }

    // 4) Everything is okay, send token to client
    return createSendToken(user, 200)
});

export const logout = catchAsync(async () => {
    const cookieStore = await cookies();

    // Remove the token cookie
    cookieStore.set("token", "", {
        httpOnly: true,
        secure: process.env.APP_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0), // 👈 instantly expires cookie
    });

    return NextResponse.json({
        status: "success",
        message: "Logged out successfully",
    });
})