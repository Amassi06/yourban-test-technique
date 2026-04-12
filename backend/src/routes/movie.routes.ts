import {Router} from 'express';
import * as movieController from '../controllers/movie.controller.js';

const router = Router();

router.post('/',movieController.createMovie);
router.get('/',movieController.getAllMovies);
router.patch('/:id', movieController.updateMovie);


export default router;
