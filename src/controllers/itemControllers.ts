import { Request, Response } from "express";
import db from "../db/queries"

import {body, validationResult} from "express-validator"

const alphaErr = "must only contain letters.";
const numericErr = "must only contain numbers";
const lengthErr = "must be between 1 and 10 characters.";

const validateItem = [
  body("itemName").trim()
    .isAlpha().withMessage(`Item name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Item name ${lengthErr}`),
    
  body("item_count").trim()
    .isNumeric().withMessage(`Item count ${numericErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Item count ${lengthErr}`),
    
  body("item_price").trim()
    .isNumeric().withMessage(`Item price ${numericErr}`),
    
  body("category_id").trim()
    .isNumeric().withMessage(`Category ID ${numericErr}`)
];

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { itemName, item_count, item_price, category_id } = req.body;
    const itemId = parseInt(req.params.itemId);

    await db.updateItem(itemName, itemId, item_count, item_price, category_id);
    res.redirect(`/item/${itemId}`);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
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