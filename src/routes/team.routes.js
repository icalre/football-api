import {Router} from 'express';

import {connect} from '../database';

const router = Router();

router.get('/', async (req, res) => {
    const db = await connect();

    const results = await db.collection('teams').find({}).toArray();

    res.json({success: true, data: results});
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const db = await connect();

    const result = await db.collection('teams').find({id: `${id}`}).toArray();

    res.json({success: true, data: result});
});

export default router;
