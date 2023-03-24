import sqlite3 from "sqlite3";
import { itemDbRow } from "../types/interfaces";

const db = new sqlite3.Database("../db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected AllItems Service to items database");
});



/**
 * Selects all items from the items database.
 * 
 * @returns an array of items
 * 
 */
export async function getAllItems(): Promise<itemDbRow[]> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM items WHERE active='true'",

      (error: any, row: itemDbRow[]) => {
        if (error) {
          console.log(error);
          return reject(400);
        }

        if (row) {
          console.log("all items searched");
          return resolve(row);
        } else {
          console.log("error");
          return resolve(row);
        }
      }
    );
  });
}
