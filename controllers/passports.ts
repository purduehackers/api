import { Request, Response, Router } from "express";
import { fetchEvents } from "../utils/fetchEvents";
import { fetchPassports } from "../utils/fetchPassports";

class PassportsController {
  public path = "/passports";
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getPassports);
  }

  public async getPassports(req: Request, res: Response) {
    try {
      if (req.headers.authorization === `Bearer ${process.env.PASSPORTS_KEY}`) {
        const passports = await fetchPassports();
        return res.json(passports);
      } else {
        return res
          .status(401)
          .send("Missing or incorrect key for this endpoint");
      }
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .send(
          `Error fetching passports:\nError: ${err.error}\nMessage: ${err.message}`
        );
    }
  }
}

export default PassportsController;
