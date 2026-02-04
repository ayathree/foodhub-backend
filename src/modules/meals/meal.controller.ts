import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createMeal: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const meal = await prisma.meal.create({
            data: payload
        });
        res.send({ message: "Meal Added", data: meal })
    } catch (error) {

    }
}
export const mealController = {
    createMeal
}