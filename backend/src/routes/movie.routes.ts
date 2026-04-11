import {Router} from 'express';
import * as movieController from '../controllers/movie.controller.js';

const router = Router();

router.post('/',movieController.createMovie);
router.get('/',movieController.getAllMovies);


export default router;
