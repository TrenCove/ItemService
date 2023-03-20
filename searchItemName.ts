import sqlite3 from "sqlite3";
import { itemDBrow } from "./types/interfaces";

const db = new sqlite3.Database("./db/items.db", (error) => {
    if (error){
        console.error(error.message);
    }
    console.log("Connected to items database");
});

export async function searchItemName(
    item_name: string,

): Promise<itemDBrow> {

    return new Promise((resolve,reject) => {
        db.all(
        
            "SELECT * FROM items WHERE item_name LIKE'%"+item_name+"%'" ,
            
        
            (error: any, row: any) => {
                if (error){
                    console.log(error);
                    return reject(400);
                }
                
                if(row){
                    console.log("item searched");
                    return resolve(row);
                }else{
                    console.log("Item by that name does not exist");
                    return resolve(row);
                }
            }
        );
    });
}