import { Category } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"


const createCategory = async (payload: Category): Promise<Category> => {
    const category = await prisma.category.create({
        data: payload
    })

    return category
}

const getAllCategory = async (): Promise<Category[]> => {
    const category = await prisma.category.findMany()
    return category
}

const updateCategory = async (id: string, payload: Partial<Category>): Promise<Category> => {
    const category = await prisma.category.update({
        where: {
            id: id
        },
        data: payload
    })

    return category
}

const deleteCategory = async (id: string): Promise<Category> => {
    const category = await prisma.category.delete({
        where: {
            id: id
        }
    })

    return category
}

export const categoryService = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}