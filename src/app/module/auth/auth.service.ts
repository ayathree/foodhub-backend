import { User } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface IRegisterPaylod {
    name: string;
    email: string;
    password: string;
    role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
}

interface ILoginUserPayload {
    email: string;
    password: string
}

const registerUser = async (payload: IRegisterPaylod) => {
    const { name, email, password, role } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            role: role || "CUSTOMER"
        }
    })

    if (!data.user) {
        throw new Error("Failed to register")
    }

    try {
        let provider = null;

        // Create provider record if role is PROVIDER
        if (data.user.role === "PROVIDER") {
            provider = await prisma.$transaction(async (tx) => {
                return await tx.provider.create({
                    data: {
                        userId: data.user.id,
                        name: payload.name,
                    }
                });
            });
        }

        // Generate tokens for ALL users
        const accessToken = tokenUtils.getAccessTokenSecret({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            emailVerified: data.user.emailVerified
        });

        const refreshToken = tokenUtils.getRefreshTokenSecret({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            emailVerified: data.user.emailVerified
        });

        // Return based on whether provider was created
        return provider
            ? { ...data, provider, accessToken, refreshToken }
            : { ...data, accessToken, refreshToken };

    } catch (error) {
        console.log("Transaction error: ", error);

        // Clean up user if something failed
        await prisma.user.delete({
            where: { id: data.user.id }
        }).catch(console.error);

        throw error;
    }
}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload

    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })



    const accessToken = tokenUtils.getAccessTokenSecret({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        emailVerified: data.user.emailVerified

    })

    const refreshToken = tokenUtils.getRefreshTokenSecret({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        emailVerified: data.user.emailVerified
    })
    return { ...data, accessToken, refreshToken }



}





export const AuthService = {
    registerUser,
    loginUser
}