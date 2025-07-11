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

export = {
    insertCategoryName,
    updateCategoryName,
    deleteCategory,
}

    