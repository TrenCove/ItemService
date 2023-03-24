import sqlite3 from "sqlite3";
import { auction_type } from "../types/interfaces";

const db = new sqlite3.Database("../db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected AddNewItems service to items database");
});


/**
 * Adds a new item into the items database.
 * 
 * @param item_name - The name of the item
 * @param description - Description of the item
 * @param top_bidder - Username of the top bidder
 * @param price - Price of the item
 * @param shipping_cost - cost of shipping the item
 * @param active - Shows if the item is active or not
 * @param auction_type - The auction type
 * @param end_time - the end time of the auction
 * 
 * @returns A http success or fail status code
*/

export async function AddNewItem(
  item_name: string,
  description: string,
  top_bidder: string,
  price: number,
  shipping_cost: number,
  active: boolean,
  auction_type: auction_type,
  end_time: Date
): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO items (item_name, description, top_bidder, price, shipping_cost, active, auction_type, end_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        item_name,
        description,
        top_bidder,
        price,
        shipping_cost,
        active,
        auction_type,
        end_time,
      ],
      (error) => {
        if (error) {
          console.log(error);
          return reject(400);
        }
        console.log("success");
        return resolve(200);
      }
    );
  });
}
