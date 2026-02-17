import { User } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

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

    if (data.user.role === "PROVIDER") {
        const provider = await prisma.$transaction(async (tx) => {
            const providerTx = await tx.provider.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,


                }
            })

            return providerTx
        })
        return { ...data, provider }
    }

    return { ...data }

}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload

    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    return data

}

export const AuthService = {
    registerUser,
    loginUser
}