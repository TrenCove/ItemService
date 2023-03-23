import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { itemInfo } from "./types/interfaces";
import { AddNewItem } from "./AddItem";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authenticationToken";
import { searchItemName } from "./searchItemName";
import { searchItemID } from "./searchItemID";
import { getAllItems } from "./getAllItems";
import cors from "cors";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = 3002;

app.get("/", (req: Request, res: Response) => {});

app.get("/testAuth", authenticateToken, (req: Request, res: Response) => {
  res.send("Authenticated as " + req.user);
});

app.post(
  "/itemAdd",
  async (req: Request<unknown, unknown, itemInfo, unknown>, res: Response) => {
    try {
      const response = await AddNewItem(
        req.body.item_name,
        req.body.description,
        req.body.top_bidder,
        req.body.price,
        req.body.shipping_cost,
        req.body.active,
        req.body.auction_type,
        req.body.end_time
      );

      if (response == 200) {
        res.sendStatus(200);
        console.log("item added");
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  }
);

app.get("/searchItemName/:item_name", async (req: Request, res: Response) => {
  try {
    const response = await searchItemName(req.params.item_name);

    res.json(response);
  } catch (error) {
    res.sendStatus(400);
  }
});
app.get("/searchItemID/:item_id", async (req: Request, res: Response) => {
  try {
    const response = await searchItemID(req.params.item_id);

    res.json(response);
  } catch (error) {
    res.sendStatus(400);
  }
});
app.get("/getAllItems", async (req: Request, res: Response) => {
  try {
    const response = await getAllItems();
    res.json(response);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`App listening on PORT ${port}`);
});
