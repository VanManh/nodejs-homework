const express = require('express');
const router = express.Router();

const restaurants = require("../controllers/Restaurants");

/* GET restaurants listing. */
router.get('/restaurants', function(req, res, next){
    restaurants.list(req, res, next);
});

router.get('/restaurants/add', restaurants.add);

router.get('/restaurants/info/:id', restaurants.info);

router.get('/restaurants/edit/:id', restaurants.edit);

router.get('/restaurants/remove/:id', restaurants.remove);

module.exports = router;
