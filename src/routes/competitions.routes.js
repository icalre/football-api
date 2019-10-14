import {Router} from 'express';
import {connect} from '../database';

import {getCompetitions, getCompetitionById, getTeams, getTeam} from '../services/football';

const router = Router();

router.get('/', async (req, res) => {
    const response = await getCompetitions();

    if (!response) {
        res.json({success: false, error: 'No se pudo obtner resultados'});
    }

    res.json({success: true, data: response.competitions});
});

router.get('/:id', async (req, res) => {

    const db = await connect();
    const {id} = req.params;
    let response = await getCompetitionById(id);

    if (!response) {
        res.json({success: false, error: 'No se pudo obtner resultados'});
    }

    let teams = await db.collection('teams').find({competition_id: `${id}`}).toArray();

    if (teams.length == 0) {
        let resultTeams = await getTeams(id);
        teams = resultTeams.teams;
    }

    if (teams) {
        teams.forEach(async (team) => {

            if (!team._id) {
                team.competition_id = id;
                await db.collection('teams').insertOne(team);
            }

            let players = await db.collection('players').find({team_id: `${team.id}`}).toArray();

            if (players.length == 0) {
                let resultTeam = await getTeam(team.id);
                if (resultTeam) {
                    team.players = resultTeam.squad;
                    team.players.forEach(async (player) => {
                        const newPlayer = {
                            name:player.name,
                            position:player.position,
                            shirtNumber: player.shirtNumber,
                            team_id: team.id
                        };
                        await db.collection('players').insertOne(newPlayer);
                    });
                }
            } else {
                team.players = players;
            }
        });

        response.teams = teams;
    }

    res.json({success: true, data: response});
});

export default router;