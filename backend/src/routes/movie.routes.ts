import {Router} from 'express';
import * as movieController from '../controllers/movie.controller.js';

const router = Router();

router.post('/',movieController.getAllMovies);
router.get('/',movieController.createMovie);


export default router;
