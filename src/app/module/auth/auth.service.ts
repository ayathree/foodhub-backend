import { User } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";

interface IRegisterPaylod {
    name: string;
    email: string;
    password: string
}

interface ILoginUserPayload {
    email: string;
    password: string
}

const registerUser = async (payload: IRegisterPaylod) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })

    if (!data.user) {
        throw new Error("Failed to register")
    }
    return data
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