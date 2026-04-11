import express from 'express';
import cors from 'cors';

import movieRoutes from './routes/movie.routes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/movies',movieRoutes);

app.listen(PORT,()=>{
    console.log('serveur démarré sur http://localhost:3001');
});
