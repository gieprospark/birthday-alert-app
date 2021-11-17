var express = require('express');
var router = express.Router();
const https = require("https");
var moment = require('moment');  
const { check, validationResult } = require('express-validator');
const db = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await db.User.findAll()
    return res.json(users)
  } catch (err) {
    console.log('There was an error querying users', JSON.stringify(err))
    return res.status(400).json(err)
  }
});

/* POST user. */
router.post('/',[
  check('first_name', 'first_name is required').not().isEmpty(),
  check('last_name', 'last_name is required').not().isEmpty(),
  check('birth_day', 'birth_day date is required').not().isEmpty(),
  check('anniversary', 'birth_day date is required').not().isEmpty(),
  check('location', 'location is required').not().isEmpty()
], async (req, res) => {
  try {
    const { first_name, last_name, birth_day, anniversary, location } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await db.User.create({ first_name, last_name, birth_day, anniversary, location })
    return res.json(user)
  } catch (err) {
    console.log('There was an error creating a user', JSON.stringify(err))
    return res.status(400).json(err)
  }
});

/* DELETE user. */
router.delete('/:id',check('id', 'id should a numeric').isInt(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id)
    const user = await db.User.findByPk(id)
    const user_delete = await user.destroy({ force: true })
    return res.json({user_delete})
  } catch (err) {
    console.log('***Error deleting user', JSON.stringify(err))
    return res.status(400).json(err)
  }
});

/* UPDATE user. */
router.put('/:id', [
  check('id', 'id should a numeric').isInt(),
  check('first_name', 'first_name is required').not().isEmpty(),
  check('last_name', 'last_name is required').not().isEmpty(),
  check('birth_day', 'birth_day date is required').not().isEmpty(),
  check('anniversary', 'anniversary date is required').not().isEmpty(),
  check('location', 'location is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id)
    const { first_name, last_name, birth_day, anniversary, location } = req.body
    const user = await db.User.findByPk(id)
    user.update({ first_name, last_name, birth_day, anniversary, location })
    return res.json(user)
  } catch (err) {
    console.log('***Error updating user', JSON.stringify(err))
    return res.status(400).json(err)
  }
});

module.exports = router;
