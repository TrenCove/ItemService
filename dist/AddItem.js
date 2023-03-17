"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewItem = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database("./db/items.db", error => {
    if (error) {
        console.error(error.message);
    }
    console.log("Connected to items database");
});
function AddNewItem(itemID, itemName, itemPrice, itemDesc) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO items (itemID, itemName, itemPrice, itemDesc) VALUES ($1,$2,$3,$4)", [itemID, itemName, itemPrice, itemDesc], (error) => {
                if (error) {
                    console.log(error);
                    return reject(400);
                }
                console.log("success");
                return resolve(200);
            });
        });
    });
}
exports.AddNewItem = AddNewItem;
