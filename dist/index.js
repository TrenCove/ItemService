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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const AddItem_1 = require("./AddItem");
const authenticationToken_1 = require("./middleware/authenticationToken");
const searchItemName_1 = require("./searchItemName");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
const port = 3000;
app.get('/', (req, res) => {
});
app.get("/testAuth", authenticationToken_1.authenticateToken, (req, res) => {
    res.send("Authenticated as " + req.user);
});
app.post("/itemAdd", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, AddItem_1.AddNewItem)(req.body.item_name, req.body.description, req.body.top_bidder, req.body.price, req.body.shipping_cost, req.body.active, req.body.auction_type, req.body.end_time);
        if (response == 200) {
            res.sendStatus(200);
            console.log("item added");
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        res.sendStatus(400);
    }
}));
app.get('/searchItemName/:item_name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, searchItemName_1.searchItemName)(req.params.item_name);
        res.json(response);
    }
    catch (error) {
        res.sendStatus(400);
    }
}));
app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
});
