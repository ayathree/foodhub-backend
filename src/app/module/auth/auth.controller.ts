import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

const registerUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.registerUser(payload);
        const { accessToken, refreshToken, token, ...rest } = result
        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthCookies(res, token as string)

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "User register successfully",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }
        })
    }
)

const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.loginUser(payload)
        const { accessToken, refreshToken, token, ...rest } = result
        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthCookies(res, token)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User login successfully",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }
        }

        )
    }
)

export const AuthController = {
    registerUser,
    loginUser
}