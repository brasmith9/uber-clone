import { Router } from 'express';

const router = Router();

router.post('/login',  (re, res) => {
    res.json({
        message: 'Logged in'
    })
});

export default router;