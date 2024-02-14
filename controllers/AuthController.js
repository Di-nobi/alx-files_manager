import dbClient from "../utils/db";
import redisClient from "../utils/redis";
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';

class AuthController {
  async getConnect(req, res) {
    const authHead = req.headers.authorization;
    const getAuth = authHead.split(' ')[1];
    const userDetails = Buffer.from(getAuth, 'base64');
    const decoder = userDetails.toString('utf-8')
    const getMail = decoder.split(':')[0]
    const getPass = decoder.split(':')[1]
    const hashPass = sha1(getPass);
    const usr = await dbClient.db.collection('users').findOne({ email: getMail });
    if (!usr || usr.password !== hashPass) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const key = uuidv4();
    const token = `auth_${key}`;
    await redisClient.set(token, usr._id.toString(), 86400)
    return res.status(200).send({ token: key });

  }
}

const authController = new AuthController();
export default authController;
