import dbClient from "../utils/db";
import redisClient from "../utils/redis";
import { ObjectId } from 'mongodb';
import sha1 from 'sha1';

class UsersController {
  async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send({"error": "Missing email"});
    }

    if (!password) {
        return res.status(400).send({"error": "Missing password"});
    }

    const usrMail = await dbClient.db.collection('users').findOne({ email });
    if (usrMail) {
        return res.status(400).send({"error": "Already exist"});
    }
    const hashPass = sha1(password);
    const newUsr = await dbClient.db.collection('users').insertOne({ email, password: hashPass});
    return res.status(201).send({ id: newUsr.insertedId, email: newUsr.ops[0].email });
  }
}

const userController = new UsersController();
export default userController;
