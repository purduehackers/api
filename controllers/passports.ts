import { Request, Response, Router } from "express";
import { fetchEvents } from "../utils/fetchEvents";

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
      // let events = await fetchEvents((req.query as any).groq);
      // res.json(events);
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
