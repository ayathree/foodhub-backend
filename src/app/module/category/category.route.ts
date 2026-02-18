import { Router } from "express";
import { categoryController } from "./category.controller";


const router = Router();

router.post('/create-category', categoryController.createCategory);
router.get('/get-all-category', categoryController.getAllCategory);
router.patch('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);


export const categoryRoutes = router