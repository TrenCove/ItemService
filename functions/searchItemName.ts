import sqlite3 from "sqlite3";
import { itemDbRow } from "../types/interfaces";

const db = new sqlite3.Database("./db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected searchItemsName service to items database");
});
/**
 * Searches the item database by a name search
 * 
 * @param item_name - name of the item search, could be a simple letter or the full name
 * 
 * @returns a JSON of several items that could potentially match the item name search
 */
export async function searchItemName(item_name: string): Promise<itemDbRow> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM items WHERE item_name LIKE'%" + item_name + "%'",

      (error: any, row: itemDbRow) => {
        if (error) {
          console.log(error);
          return reject(400);
        }

        if (row) {
          console.log("item searched");
          return resolve(row);
        } else {
          console.log("Item by that name does not exist");
          return resolve(row);
        }
      }
    );
  });
}
