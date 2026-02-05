import { Router } from "express";
import userRouter from "../modules/user/user.route";
import providerRouter from "../modules/provider/provider.router";
import mealRouter from "../modules/meals/meal.router";

const routes = Router();

routes.use("/auth", userRouter)
routes.use("/provider", providerRouter)
routes.use("", mealRouter)

export default routes