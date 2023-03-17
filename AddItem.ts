import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/items.db", error => {
    if (error){
        console.error(error.message);
    }
    console.log("Connected to items database");
});

export async function AddNewItem(
    itemID: number,
    itemName: string,
    itemPrice: string,
    itemDesc: string,
): Promise<number> {

    return new Promise((resolve,reject) => {
        db.run(
            "INSERT INTO items (itemID, itemName, itemPrice, itemDesc) VALUES ($1,$2,$3,$4)",
            [itemID, itemName, itemPrice, itemDesc],
            (error) => {
                if (error){
                    console.log(error);
                    return reject(400);
                }
                console.log("success");
                return resolve(200);
            }
        );
    });
}