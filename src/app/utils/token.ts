import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";

const getAccessTokenSecret = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN } as SignOptions)

    return accessToken
}

const getRefreshTokenSecret = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN } as SignOptions)
    return refreshToken
}

export const tokenUtils = {
    getAccessTokenSecret,
    getRefreshTokenSecret
}