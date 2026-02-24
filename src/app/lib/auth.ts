import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../../generated/prisma/enums";
import { phoneNumber } from "better-auth/plugins";
import ms, { StringValue } from "ms";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    emailAndPassword: {
        enabled: true
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: Role.CUSTOMER
            },
            phone: {
                type: "string",
                required: false,
                defaultValue: null
            },
            address: {
                type: "string",
                required: false,
                defaultValue: null
            }
        }
    },

    session: {
        expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
        updateAge: 60 * 60 * 60 * 24, // Update age is same as expiresIn for simplicity
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 60 * 24, // Max age is same as expiresIn for simplicity
        }

    }



    // trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000"],

    // advanced: {
    //     disableCSRFCheck: true
    // }
});