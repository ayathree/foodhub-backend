import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { Response } from "express";
import { CookieUtils } from "./cookie";
import ms, { StringValue } from 'ms'

const getAccessTokenSecret = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN } as SignOptions)

    return accessToken
}

const getRefreshTokenSecret = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN } as SignOptions)
    return refreshToken
}

const setAccessTokenCookie = (res: Response, token: string) => {

    CookieUtils.setCookie(res, 'accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24
    })
}

const setRefreshTokenCookie = (res: Response, token: string) => {

    CookieUtils.setCookie(res, 'refreshToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24 * 7
    })
}

const setBetterAuthCookies = (res: Response, token: string) => {

    CookieUtils.setCookie(res, 'better-auth.session_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24
    })
}

export const tokenUtils = {
    getAccessTokenSecret,
    getRefreshTokenSecret,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthCookies
}