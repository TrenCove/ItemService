import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { itemStuff } from "./types/interfaces";
import { AddNewItem } from "./AddItem";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authenticationToken";


const app: Express = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const port = 3000;

app.get('/', (req: Request, res: Response) => {

});

app.get("/testAuth", authenticateToken, (req: Request, res: Response) => {
    res.send("Authenticated as " + req.user);
  });


app.post(
    "/itemAdd",
    async (
        req: Request<unknown, unknown, itemStuff, unknown>,
        res: Response
    ) => {
        try{
            const response = await AddNewItem(
                req.body.itemID,
                req.body.itemName,
                req.body.itemPrice,
                req.body.itemDesc
            );

            if(response == 200) {
                const token = jwt.sign(req.body.itemName, "memes");
                res.json(token);
            } else{
                res.sendStatus(400);
            }
        } catch (error){
            res.sendStatus(400);
        }
    }
)

app.listen(port, () => {
 console.log(`App listening on PORT ${port}`);
});