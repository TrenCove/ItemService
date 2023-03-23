import sqlite3 from "sqlite3";
import { itemDbRow } from "./types/interfaces";

const db = new sqlite3.Database("./db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected searchItemID service to items database");
});

export async function searchItemID(item_id: string): Promise<itemDbRow> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM items WHERE item_id LIKE'%" + item_id + "%'",

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
