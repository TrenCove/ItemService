import sqlite3 from "sqlite3";
import { itemDBrow } from "./types/interfaces";

const db = new sqlite3.Database("./db/items.db", (error) => {
    if (error){
        console.error(error.message);
    }
    console.log("Connected to items database");
});

export async function searchItemName(
    itemName: string,

): Promise<number> {

    return new Promise((resolve,reject) => {
        db.get(
            "SELECT *FROM items WHERE itemName=?",
            [itemName],
            (error, row: itemDBrow) => {
                if (error){
                    console.log(error);
                    return reject(400);
                }
                
                if(row && row.itemName){
                    console.log("item searched");
                    console.log(row.itemID)
                    console.log(row.itemName)
                    console.log(row.itemPrice)
                    console.log(row.itemDesc)
                    return resolve(200);
                }else{
                    console.log("Item by that name does not exist");
                    return resolve(401);
                }
            }
        );
    });
}