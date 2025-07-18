import { Request, Response } from "express";
import db from "../db/queries"

async function createCategoryNamePost(req: Request, res: Response) {
    const {categoryName} = req.body
    await db.insertCategoryName(categoryName)
    res.redirect("/category")
}

async function createCategoryNameGet(req: Request, res: Response) {
    res.render("categoryCreate")
}

async function updateCategoryName(req:Request, res: Response) {
    const {categoryName, categoryId} = req.body;

    await db.updateCategoryName(categoryName, categoryId)
    res.status(200).json({categoryName, categoryId})
}

async function deleteCategory(req: Request, res:Response) {
    const {categoryId} = req.body;

    await db.deleteCategory(categoryId)
    res.status(200).json(categoryId)
}

async function getAllCategories(req:Request, res: Response) {
    const categories = await db.getAllCategories()
    console.log(categories)
    res.render("categories", {categories})
}

async function getCategoryItems(req: Request, res: Response) {
    const category_id = parseInt(req.params.categoryId);
    const items = await db.getCategoryItems(category_id)
    res.render('categoryItems', {items})
}

export = {
    createCategoryNamePost,
    createCategoryNameGet,
    updateCategoryName,
    deleteCategory,
    getAllCategories,
    getCategoryItems
}