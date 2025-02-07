import express from 'express';
// import SQL connection
// controller file with business logic of routers i.e. cloudwatch fetch, JWOT

const router = express.Router();

//delete, once was a test route
router.get('/test', (req, res) => {
    return res.send('server is working');
})


//delete the whole page if able to 
export default router