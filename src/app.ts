import express, { Application, Request, Response } from "express";

import { AuthRoute } from "./app/module/auth/auth.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { categoryRoutes } from "./app/module/category/category.route";
import cookieParser from "cookie-parser";


const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', AuthRoute)
app.use('/api/categories', categoryRoutes)

// Basic route
// app.get('/', async (req: Request, res: Response) => {
//     const user = await prisma.user.create({
//         data: {
//             name: "lana",
//             email: "lana@gmail.com"
//         }
//     })
//     res.status(201).json({
//         success: true,
//         message: "Api is working",
//         data: user
//     })
// });

app.use(globalErrorHandler)
app.use(notFound)

export default app;