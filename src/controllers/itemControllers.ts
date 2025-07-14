import { Request, Response } from "express";
import db from "../db/queries"

async function insertItem(req: Request, res: Response) {
    const {itemName, category_id, item_count, item_price} = req.body

    await db.insertItem(itemName, category_id, item_count, item_price)
    res.status(200).json({itemName, category_id, item_count, item_price})
}

async function updateItem(req: Request, res: Response) {
    const {itemName, itemId, item_count, item_price, category_id} = req.body

    await db.updateItem(itemName, itemId, item_count, item_price, category_id)
    res.status(200).json({itemName, itemId, item_count, item_price, category_id})
}

async function deleteItem(req: Request, res: Response) {
    const {itemId} = req.body

    await db.deleteItem(itemId)
    res.status(200).json({"Item is deleted": itemId})
}

async function getAllItems(req: Request, res: Response) {
    const items = await db.getAllItems()
    console.log(items)
    res.status(200).json(items)
}

async function getItem(req: Request, res: Response) {
    const {itemId} = req.body;
    const item = await db.getItem(itemId)
    res.status(200).json(item)
}

async function getCategoryItems(req: Request, res: Response) {
    const category_id = parseInt(req.query.categoryId as string);
    const items = await db.getCategoryItems(category_id)
    res.status(200).json(items)
}

export default {
    insertItem,
    updateItem,
    deleteItem,
    getAllItems,
    getItem,
    getCategoryItems,
}