const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  const athlete = req.body.athlete
  const queryText = `
  SELECT athletes.athlete_name, events.event_name, swim_time, times.date
  FROM times
  JOIN events on times.event_id=events.id
  JOIN athletes on times.athlete_id = athletes.id
  ORDER BY times.date DESC
  `
  pool.query(queryText).then(result => {
    console.log('query:', result.rows);
    res.send(result.rows)
  }).catch(error => {
    console.log(error)
    res.sendStatus(500);
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  master
  const desc = req.body.description;
  const img = req.body.image_url
  const usr = req.user.id
  let queryText = 'INSERT INTO item (description, image_url, user_id) VALUES($1,$2,$3)'
  pool.query(queryText, [desc, img, usr]).then(result => {
    res.sendStatus(202);
  }).catch(error => {
    res.sendStatus(500)
  })

});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let queryText = 'DELETE FROM item WHERE id=$1 AND user_id=$2'
  pool.query(queryText, [req.params.id, req.user.id]).then(result => {
    res.sendStatus(203)
  }).catch(error => {
    res.sendStatus(500)
  })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});




/**
 * Delete an item if it's something the logged in user added
 */





module.exports = router;