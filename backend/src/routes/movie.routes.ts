import {Router} from 'express';
import * as movieController from '../controllers/movie.controller.js';

const router = Router();

router.post('/',movieController.createMovie);
router.get('/',movieController.getAlhttp://localhost:3001/api/movies/6lMovies);
router.patch('/:id', movieController.updateMovie);
router.delete('/:id',movieController.deleteMovie);

export default router;
