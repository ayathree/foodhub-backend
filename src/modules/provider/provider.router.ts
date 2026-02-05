import { Router } from "express";
import { providerController } from "./provider.controller";

const providerRouter = Router()

providerRouter.post('/meals', providerController.createMeal);

export default providerRouter;