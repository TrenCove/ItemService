import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { itemInfo } from "./types/interfaces";
import { AddNewItem } from "./functions/AddItem";
import { authenticateToken } from "./middleware/authenticationToken";
import { searchItemName } from "./functions/searchItemName";
import { searchItemID } from "./functions/searchItemID";
import { getAllItems } from "./functions/getAllItems";
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


/**
 * Calls addNewItem method in the AddItems class. Uses post to write from a JSON
 * to the method.
 * Reads the response of the called method.
 * 
 * @returns a status code to see if the call went through.
 * 
 * @beta
 */
app.post(
  "/itemAdd", authenticateToken,
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

/**
 * Calls searchItemName method in the searchItemName class. Uses get to retrieve information from the URL.
 * Reads the response of the called method.
 * 
 * @returns Either a JSON of the searchItemName response, or a Error status code.
 * 
 * @beta
 */
app.get("/searchItemName/:item_name", authenticateToken, async (req: Request, res: Response) => {
  try {
    const response = await searchItemName(req.params.item_name);

    res.json(response);
  } catch (error) {
    res.sendStatus(400);
  }
});

/**
 * Calls searchItemID method in the searchItemID class. Uses get to retrieve information from the URL.
 * Reads the response of the called method.
 * 
 * @returns Either a JSON of the searchItemID response, or a Error status code.
 * 
 * @beta
 */
app.get("/searchItemID/:item_id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const response = await searchItemID(req.params.item_id);

    res.json(response);
  } catch (error) {
    res.sendStatus(400);
  }
});
/**
 * Calls getAllItems method in the getAllItems class. Uses get to retrieve information from the URL.
 * Reads the response of the called method.
 * 
 * @returns Either a JSON of the searchItemID response, or a Error status code.
 * 
 * @beta
 */
app.get("/getAllItems", authenticateToken, async (req: Request, res: Response) => {
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
