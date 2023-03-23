import sqlite3 from "sqlite3";
import { itemDbRow } from "./types/interfaces";

const db = new sqlite3.Database("./db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected AllItems Service to items database");
});

export async function getAllItems(): Promise<itemDbRow> {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM items",

      (error: any, row: itemDbRow) => {
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
