import { Request, Response, Router } from "express";
import { fetchPassports } from "../utils/fetchPassports";
import { updatePassports } from "../utils/updatePassports";

class PassportsController {
  public getPath = "/passports";
  public postPath = "/passports/activate";
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.getPath, this.getPassports);
    this.router.post(this.postPath, this.postPassports);
  }

  public async getPassports(req: Request, res: Response) {
    try {
      if (req.headers.authorization === `Bearer ${process.env.PASSPORTS_KEY}`) {
        try {
          const passports = await fetchPassports();
          return res.json(passports);
        } catch (err) {
          console.log("Error updating passport:", err);
          return res.status(400).send(`Error updating passport: ${err}`);
        }
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

  public async postPassports(req: Request, res: Response) {
    try {
      if (req.headers.authorization === `Bearer ${process.env.PASSPORTS_KEY}`) {
        const updatedPassport = await updatePassports(req.body.id);
        return res.json(updatedPassport);
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
