import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import logger from "../middleware/logger";
import EventsController from "../controllers/events";
import WishlistController from "../controllers/wishlist";
import PassportsController from "../controllers/passports";

const app = express();
const port = process.env.PORT || "8080";

app.use(cors());
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const eventsController = new EventsController();
const wishlistController = new WishlistController();
const passportsController = new PassportsController();

app.use("/", eventsController.router);
app.use("/", wishlistController.router);
app.use("/", passportsController.router);

app.get("/", (req, res) => {
  res.send("Welcome to Purdue Hackers' api");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
