import appController from '../controllers/AppController';
import userController from '../controllers/UsersController';

import express, { Router } from 'express';

const router = express.Router();

router.get('/status', (req, res) => appController.getStatus(req, res));

router.get('/stats', (req, res) => appController.getStats(req, res));

router.post('/users', (req, res) => userController.postNew(req, res));

// export default function Routes(app) {
//     const router = express.Router();
//     app.use('/', router);

//     router.get('/status', (req, res) => {
//         AppController.getStatus(req, res);
//     });
    
//     router.get('/stats', (req, res) => {
//         AppController.getStats(req, res);
//     });
    
// }
export default router;