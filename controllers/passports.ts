import { Request, Response, Router } from "express";
import { fetchPassports } from "../utils/fetchPassports";

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

  public async postPassports(req: Request, res: Response) {
    try {
      if (req.headers.authorization === `Bearer ${process.env.PASSPORTS_KEY}`) {
        // Fetch passport given id and set activated to true
        // Fetch all other passports by that user that are marked activated
        // If there are any, mark all of them deactivated

        const passportId = Number(req.body.id);

        try {
          const passport = await prisma.passport.update({
            where: {
              id: passportId,
            },
            data: {
              activated: true,
            },
          });
          const ownerId = passport.owner_id;

          const otherPassports = await prisma.passport.findMany({
            where: {
              owner_id: ownerId,
              activated: true,
              NOT: {
                id: passportId,
              },
            },
          });
          if (otherPassports.length > 0) {
            for (const otherPassport of otherPassports) {
              await prisma.passport.update({
                where: {
                  id: otherPassport.id,
                },
                data: {
                  activated: false,
                },
              });
            }
          }

          return res.json(passport);
        } catch (err) {
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
}

export default PassportsController;
