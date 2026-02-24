import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { CookieUtils } from "../utils/cookie";
import { prisma } from "../lib/prisma";
import { jwtUtils } from "../utils/jwt";

export const checkAuth = (...authRoles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = CookieUtils.getCookie(req, 'better-auth.session_token');

        if (!sessionToken) {
            throw new Error("Unauthorized access - No session token provided");
        }
        if (sessionToken) {
            const sessionExists = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date()
                    }
                },
                include: {
                    user: true
                }
            })
            if (sessionExists && sessionExists.user) {
                const user = sessionExists.user
                const now = new Date()
                const sessionExpiry = new Date(sessionExists.expiresAt)
                const createdAt = new Date(sessionExists.createdAt)

                const sessionlifetime = sessionExpiry.getTime() - createdAt.getTime()
                const timeLeft = sessionExpiry.getTime() - now.getTime()
                const percentageLeft = (timeLeft / sessionlifetime) * 100

                if (percentageLeft < 50) {
                    res.setHeader("x-refresh-token", "true")
                    res.setHeader("x-session-expires-at", sessionExpiry.toISOString())
                    res.setHeader("x-time-remaining", timeLeft.toString())

                    console.log('session expiring soon, consider refreshing the token')

                }

                if (authRoles.length > 0 && !authRoles.includes(user.role)) {
                    throw new Error("Forbidden - You don't have permission to access this resource 1");
                }
                // return next()


            }

            const accessToken = CookieUtils.getCookie(req, 'accessToken');

            if (!accessToken) {
                throw new Error("Unauthorized access - No access token provided");
            }
        }

        const accessToken = CookieUtils.getCookie(req, 'accessToken');
        if (!accessToken) {
            throw new Error("Unauthorized access - No access token provided");
        }
        const verifiedToken = jwtUtils.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

        if (!verifiedToken.success) {
            throw new Error("Unauthorized access - Invalid access token");
        }
        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role as Role)) {
            throw new Error("Forbidden - You don't have permission to access this resource 2");
        }

        next()

    } catch (error: any) {
        next(error)

    }

}