import {Router} from 'express';

import {connect} from '../database';

const router = Router();


router.get('/', async (req, res) => {
    const db = await connect();

    const results = await db.collection('players').find({}).toArray();

    res.json({success: true, data: results});
});


export default router;
