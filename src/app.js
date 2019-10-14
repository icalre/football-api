import express, {json} from 'express';

//Import Routes
import IndexRoutes from './routes/index.route';
import CompetitionsRoutes from './routes/competitions.routes';
import TeamRoutes from './routes/team.routes';
import PlayersRoutes from './routes/player.routes';

const  app = express();

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(json());

//Routes
app.use(IndexRoutes);
app.use('/competitions',CompetitionsRoutes);
app.use('/team',TeamRoutes);
app.use('/players',PlayersRoutes);

export default app;