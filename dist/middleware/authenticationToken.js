"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == undefined) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, "memes", (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
