import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";




const getMeals: RequestHandler = async (req, res) => {
    try {

        const data = await prisma.meal.findMany()
        res.send({ message: "Meals", data })
    } catch (error) {
        console.error(error)

    }
}
export const mealController = {

    getMeals
}