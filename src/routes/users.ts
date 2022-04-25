import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import authenticate from "../middlewares/verifyAuthToken";
import decoder from "../utils/decode";
import passwordChecker from "../utils/checkPassword";
import express from "express";

const router = express.Router();
const Users = new UserStore();

router.get(
  "/",
  authenticate,
  async (_req: express.Request, res: express.Response) => {
    //Gets a list of users and returns a JSON containing the list
    try {
      const response = await Users.index();
      res.json(response);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.get(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    //Gets a user with the supplied id and responds with a JSON containing the user
    try {
      const id = req.params.id;
      const response = await Users.show(id);
      res.json(response);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.post("/", async (req: express.Request, res: express.Response) => {
  //Creates a user and signs a JWT token using the user data, then responds with the JWT token.
  try {
    const u: User = {
      email: req.body.email,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      password: req.body.password
    };
    const response = await Users.create(u);
    const token = jwt.sign(
      { user: response },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
});

router.put(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    //Edits the user in the database if the correct user data is provided
    try {
      const u: User = {
        id: req.params.id,
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password,
        newPassword: req.body.newpassword
      };
      const decoded = decoder(req.headers.authorization as string); //Gets the decoded payload from the JWT token
      if (
        u.id == ((decoded.user as User).id as string) && //Checks if the user is trying to edit another user's data
        (await passwordChecker(
          //Checks if the password in the JWT is the correct password for the user with the supplied id
          (decoded.user as User).id as string,
          u.password
        ))
      ) {
        const response = await Users.update(u);
        const token = jwt.sign(
          { user: response },
          process.env.TOKEN_SECRET as string
        );
        res.json(token);
        return;
      }
      res.status(401).json("Invalid Credentials");
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    //Deletes the user from the database if the id is the same id in the JWT token and has the correct password in the database
    try {
      const decoded = decoder(req.headers.authorization as string);
      const password = req.body.password;
      if (
        ((decoded.user as User).id as string) == req.params.id && //Checks if the user is trying to delete another user's data
        (await passwordChecker(
          //Checks if the correct password is supplied in the JWT
          (decoded.user as User).id as string,
          password
        ))
      ) {
        const response = await Users.delete(req.params.id);
        res.json(response);
        return;
      }
      res.status(401).json("Invalid Credentials");
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.post(
  "/authenticate/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const u = await Users.authenticate(req.params.id, req.body.password);
      if (u != null) {
        const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
        res.json(token);
        return;
      }
      res.status(401).json(`Invalid Password Given`);
    } catch (error) {
      res.status(401).json(`${error}`);
    }
  }
);

export default router;
