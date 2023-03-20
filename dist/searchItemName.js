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
exports.searchItemName = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database("./db/items.db", (error) => {
    if (error) {
        console.error(error.message);
    }
    console.log("Connected to items database");
});
function searchItemName(item_name) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM items WHERE item_name LIKE'%" + item_name + "%'", (error, row) => {
                if (error) {
                    console.log(error);
                    return reject(400);
                }
                if (row) {
                    console.log("item searched");
                    return resolve(row);
                }
                else {
                    console.log("Item by that name does not exist");
                    return resolve(row);
                }
            });
        });
    });
}
exports.searchItemName = searchItemName;
