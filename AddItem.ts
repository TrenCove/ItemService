import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/items.db", error => {
    if (error){
        console.error(error.message);
    }
    console.log("Connected to items database");
});

export async function AddNewItem(
    itemName: string,
    auctionType: string,
    endTime: string,
): Promise<number> {

    return new Promise((resolve,reject) => {
        db.run(
            "INSERT INTO items (item_name, auction_type, end_time) VALUES ($1,$2,$3)",
            [itemName, auctionType, endTime],
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