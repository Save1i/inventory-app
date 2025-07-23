import { neon } from '@neondatabase/serverless';
require("dotenv").config({ debug: true });
const sql = neon(process.env.DATABASE_URL as string);

async function insertCategoryName(categoryName: string) {
    await sql.query("INSERT INTO Categories (name) VALUES ($1)", [categoryName]);
}

async function updateCategoryName(categoryName:string, categoryId: number){
    await sql.query("UPDATE Categories SET name=($1) WHERE category_id=($2)", [categoryName, categoryId])
}

async function deleteCategory(categoryId:number) {
    await sql.query("DELETE FROM Categories WHERE category_id=($1)", [categoryId])
}

async function getAllCategories() {
    const rows = await sql.query("SELECT * FROM Categories")
    return rows
}

async function insertItem(itemName: string, category_id: number, item_count: number, item_price: number) {
    await sql.query("INSERT INTO Items (item_name, category_id, item_count, item_price) VALUES ($1, $2, $3, $4)", [itemName, category_id, item_count, item_price]);
}

async function updateItem(itemName: string, itemId?:number, item_count?: number, item_price?: number, category_id?: number) {
    await sql.query("UPDATE items SET item_name=$1, category_id=$5, item_count=$3, item_price=$4 WHERE item_id=$2", [itemName, itemId, item_count, item_price, category_id] )
}

async function deleteItem(itemId: number) {
    await sql.query("DELETE FROM items WHERE item_id=($1)", [itemId])
}

async function getAllItems() {
    const rows = await sql.query("SELECT * FROM items")
    return rows
}

async function getItem(itemId: number) {
    const item = await sql.query("SELECT * FROM items WHERE item_id=$1", [itemId])
    return item
}

async function getCategoryItems(category_id: number) {
    const items = await sql.query("SELECT * FROM items WHERE category_id=$1", [category_id])
    return items
}

async function postNewUser(username: string, hashedPassword: string) {
    await sql.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword])
}

async function getUser(username: string) {
    const user = await sql.query("SELECT * FROM users WHERE username = $1", [username])
    return user
}

async function getUserById(id: number) {
    const user = await sql.query("SELECT * FROM users WHERE id = $1", [id])
    return user
}

export = {
    insertCategoryName,
    updateCategoryName,
    deleteCategory,
    getAllCategories,
    insertItem,
    updateItem, 
    deleteItem,
    getAllItems,
    getItem,
    getCategoryItems,
    postNewUser,
    getUser,
    getUserById
}

    