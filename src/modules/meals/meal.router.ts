import { Router } from "express";
import { mealController } from "./meal.controller";

const mealRouter = Router()


mealRouter.get('/meals', mealController.getMeals)

export default mealRouter