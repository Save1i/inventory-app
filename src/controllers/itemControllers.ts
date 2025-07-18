import { Request, Response } from "express";
import db from "../db/queries"

async function insertItemPost(req: Request, res: Response) {
    const {itemName, item_count, category_id, item_price} = req.body

    // const category_id = parseInt(req.params.category_id)

    await db.insertItem(itemName, category_id, item_count, item_price)
    // const items = await db.getCategoryItems(category_id)
    res.redirect(`/category/${category_id}`)
}

async function insertItemGet(req: Request, res: Response) {
    const categories = await db.getAllCategories()
    res.render("itemCreate", {categories})
}

async function updateItem(req: Request, res: Response) {
    const {itemName, itemId, item_count, item_price, category_id} = req.body

    await db.updateItem(itemName, itemId, item_count, item_price, category_id)
    // res.status(200).json({itemName, itemId, item_count, item_price, category_id})
    res.redirect(`/item/${itemId}`)
}

async function deleteItem(req: Request, res: Response) {
    const {itemId} = req.body

    await db.deleteItem(itemId)
    res.status(200).json({"Item is deleted": itemId})
}

async function getAllItems(req: Request, res: Response) {
    const items = await db.getAllItems()

    res.status(200).json(items)
}

async function getItem(req: Request, res: Response) {
    let itemId = 0;
    if(req.params.itemId) {
        itemId = parseInt(req.params.itemId);
    } else {
        itemId = req.body.itemId
    }
    const item = await db.getItem(itemId)
    res.render('item', {item})
    // res.json({item})
}

async function getItemForUpdate(req: Request, res: Response) {
    let itemId = 0;
    if(req.params.itemId) {
        itemId = parseInt(req.params.itemId);
    } else {
        itemId = req.body.itemId
    }
    const item = await db.getItem(itemId)
    res.render('itemUpdate', {item})
}


export default {
    insertItemPost,
    insertItemGet,
    updateItem,
    deleteItem,
    getAllItems,
    getItem,
    getItemForUpdate,
}