import { Request, Response } from "express";
import db from "../db/queries"

async function createCategoryName(req: Request, res: Response) {
    const {categoryName} = req.body
    await db.insertCategoryName(categoryName)
    res.status(200).json(categoryName)
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

export = {
    createCategoryName,
    updateCategoryName,
    deleteCategory,
}