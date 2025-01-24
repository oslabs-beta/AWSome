import express from 'express';
// import SQL connection
// controller file with business logic of routers i.e. cloudwatch fetch, JWOT

const router = express.Router();


router.get('/test', (req, res) => {
    return res.send('server is working');
})


export default router